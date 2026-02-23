const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sequelize = require("../db/sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { Company, User, UserRole, Role, Employee } = require("../models");
const { validateCreate: validateCompanyCreate } = require("../validators/company");
const { validateCreate: validateUserCreate } = require("../validators/user");
const { generateCompanyId, generateEmployeeId } = require("../utils/idGenerator");

const MAX_RETRY_ATTEMPTS = 5;
const DEFAULT_ADMIN_ROLE_NAME = "OWNER";
const OWNER_ROLE_ID = 1;

const toValidationError = (errors) => ({ name: "ValidationError", errors });

const getRoleId = async (roleUserData = null, transaction = null) => {
    if (roleUserData?.roleId) {
        const requestedRoleId = Number(roleUserData.roleId);
        if (!Number.isInteger(requestedRoleId) || requestedRoleId !== OWNER_ROLE_ID) {
            throw toValidationError({ roleId: [`roleId must be ${OWNER_ROLE_ID} (${DEFAULT_ADMIN_ROLE_NAME})`] });
        }
    }

    const adminRole = await Role.findOne({
        where: {
            id: OWNER_ROLE_ID,
            name: DEFAULT_ADMIN_ROLE_NAME,
            isDeleted: false,
            isActive: true
        },
        transaction
    });

    if (!adminRole) {
        throw toValidationError({ roleId: [`${DEFAULT_ADMIN_ROLE_NAME} role not found`] });
    }

    return OWNER_ROLE_ID;
};

const sanitizeUserForResponse = (user) => {
    if (!user) return null;
    const plain = user.toJSON ? user.toJSON() : user;
    const { password, ...safeUser } = plain;
    return safeUser;
};

const resolveLinkedUser = async (company, transaction = null) => {
    const employee = await Employee.findOne({
        where: {
            companyId: company.companyId,
            isDeleted: false
        },
        include: [
            {
                model: User,
                required: true,
                where: { isDeleted: false },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: Role,
                        required: true,
                        attributes: [],
                        where: { name: DEFAULT_ADMIN_ROLE_NAME, isDeleted: false, isActive: true },
                        through: {
                            model: UserRole,
                            attributes: [],
                            where: { isDeleted: false }
                        }
                    }
                ]
            }
        ],
        order: [["employeeSequence", "ASC"]],
        transaction
    });

    return employee?.User || null;
};

const attachUserDetails = async (companies, transaction = null) => {
    const rows = Array.isArray(companies) ? companies : [companies];

    const withUsers = await Promise.all(rows.map(async (item) => {
        const linkedUser = await resolveLinkedUser(item, transaction);
        return {
            ...item.toJSON(),
            User: sanitizeUserForResponse(linkedUser || null)
        };
    }));

    return withUsers;
};

const companyCreationService = {
    createCompanyWithUser: async (input, context) => {
        const { company: companyData, user: userData, roleUser: roleUserData } = input || {};

        if (!companyData) {
            throw toValidationError({ company: ["company data is required"] });
        }

        if (!userData) {
            throw toValidationError({ user: ["user data is required"] });
        }

        logger.info("CompanyCreationService: Creating company with user", {
            companyName: companyData.companyName,
            username: userData.username,
            actorId: context?.actor?.userId
        });

        return sequelize.transaction(async (transaction) => {
            const actorUserId = context?.actor?.userId ?? null;
            const validatedCompanyData = await validateCompanyCreate(companyData);
            const validatedUserData = await validateUserCreate(userData);
            const roleId = await getRoleId(roleUserData, transaction);

            validatedUserData.password = await bcrypt.hash(validatedUserData.password, 10);

            const user = await User.create(
                {
                    ...validatedUserData,
                    createdBy: actorUserId,
                    updatedBy: actorUserId
                },
                { transaction, context }
            );

            const companyBase = {
                ...validatedCompanyData,
                createdBy: actorUserId,
                updatedBy: actorUserId
            };

            let company;
            let attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    company = await Company.create(
                        {
                            ...companyBase,
                            companyId: generateCompanyId()
                        },
                        { transaction, context }
                    );
                    break;
                } catch (error) {
                    const isUniqueError =
                        error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "company_id" || e.path === "companyId");

                    if (!isUniqueError) {
                        throw error;
                    }

                    attempts += 1;
                    if (attempts >= MAX_RETRY_ATTEMPTS) {
                        throw new Error("Failed to generate unique company_id after maximum retries");
                    }
                    logger.warn(`CompanyCreationService: Duplicate company_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                }
            }

            attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    await Employee.create(
                        {
                            employeeId: generateEmployeeId(),
                            userId: user.id,
                            companyId: company.companyId,
                            activeFlag: "Y",
                            createdBy: actorUserId,
                            updatedBy: actorUserId
                        },
                        { transaction, context }
                    );
                    break;
                } catch (error) {
                    const isUniqueError =
                        error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "employee_id" || e.path === "employeeId");

                    if (!isUniqueError) {
                        throw error;
                    }

                    attempts += 1;
                    if (attempts >= MAX_RETRY_ATTEMPTS) {
                        throw new Error("Failed to generate unique employee_id after maximum retries");
                    }
                    logger.warn(`CompanyCreationService: Duplicate employee_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                }
            }

            await UserRole.create(
                {
                    userId: user.id,
                    roleId,
                    createdBy: actorUserId,
                    updatedBy: actorUserId
                },
                { transaction, context }
            );

            return {
                ...company.toJSON(),
                User: {
                    ...sanitizeUserForResponse(user),
                    UserRoles: [{ roleId, Role: { id: roleId, name: null } }]
                }
            };
        });
    },

    getAllCompanyCreations: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = "",
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        const offset = (page - 1) * validLimit;

        const whereClause = {
            isDeleted: false,
            ...(search
                ? {
                    [Op.or]: [
                        { companyId: { [Op.like]: `%${search}%` } },
                        { companyName: { [Op.like]: `%${search}%` } },
                        { mailId: { [Op.like]: `%${search}%` } },
                        { propName: { [Op.like]: `%${search}%` } }
                    ]
                }
                : {})
        };

        const { count, rows } = await Company.findAndCountAll({
            where: whereClause,
            limit: validLimit,
            offset,
            order: buildSortOrder(sortBy, sortOrder, "company_seq", "Company")
        });

        const items = await attachUserDetails(rows);

        return {
            items,
            paging: {
                currentPage: page,
                totalPages: Math.ceil(count / validLimit),
                itemsPerPage: validLimit,
                totalItems: count
            }
        };
    },

    getCompanyCreationById: async (id) => {
        const company = await Company.findOne({
            where: { companySequence: id, isDeleted: false }
        });

        if (!company) {
            return null;
        }

        const [item] = await attachUserDetails(company);
        return item;
    },

    updateCompanyWithUser: async (id, input, context) => {
        const { company: companyData, user: userData, roleUser: roleUserData } = input || {};

        return sequelize.transaction(async (transaction) => {
            const company = await Company.findOne({
                where: { companySequence: id, isDeleted: false },
                transaction
            });

            if (!company) {
                throw new Error("Company not found");
            }

            if (companyData && Object.keys(companyData).length > 0) {
                const { companyId, companySequence, createdBy, createdAt, ...safeCompanyData } = companyData;

                await Company.update(
                    {
                        ...safeCompanyData,
                        updatedBy: context?.actor?.userId ?? company.updatedBy
                    },
                    {
                        where: { companySequence: id, isDeleted: false },
                        transaction,
                        context
                    }
                );
            }

            const linkedUser = await resolveLinkedUser(company, transaction);
            const linkedUserId = linkedUser?.id || null;
            if (linkedUserId && userData && Object.keys(userData).length > 0) {
                const updateData = { ...userData };
                if (updateData.password) {
                    updateData.password = await bcrypt.hash(updateData.password, 10);
                } else {
                    delete updateData.password;
                }

                await User.update(
                    {
                        ...updateData,
                        updatedBy: context?.actor?.userId ?? null
                    },
                    {
                        where: { id: linkedUserId, isDeleted: false },
                        transaction,
                        context
                    }
                );
            }

            if (linkedUserId && roleUserData?.roleId) {
                const roleId = await getRoleId(roleUserData, transaction);
                const existingMapping = await UserRole.findOne({
                    where: { userId: linkedUserId, isDeleted: false },
                    transaction
                });

                if (existingMapping) {
                    await UserRole.update(
                        {
                            roleId,
                            updatedBy: context?.actor?.userId ?? null
                        },
                        {
                            where: { userId: linkedUserId, isDeleted: false },
                            transaction,
                            context
                        }
                    );
                } else {
                    await UserRole.create(
                        {
                            userId: linkedUserId,
                            roleId,
                            createdBy: context?.actor?.userId ?? null,
                            updatedBy: context?.actor?.userId ?? null
                        },
                        { transaction, context }
                    );
                }
            }

            const updatedCompany = await Company.findOne({
                where: { companySequence: id, isDeleted: false },
                transaction
            });
            const [item] = await attachUserDetails(updatedCompany, transaction);
            return item;
        });
    },

    deleteCompanyWithUser: async (id, context) => {
        return sequelize.transaction(async (transaction) => {
            const company = await Company.findOne({
                where: { companySequence: id, isDeleted: false },
                transaction
            });

            if (!company) {
                throw new Error("Company not found");
            }

            await Company.update(
                {
                    isDeleted: true,
                    isActive: false,
                    updatedBy: context?.actor?.userId ?? company.updatedBy
                },
                {
                    where: { companySequence: id, isDeleted: false },
                    transaction,
                    context
                }
            );

            const linkedUser = await resolveLinkedUser(company, transaction);
            const linkedUserId = linkedUser?.id || null;
            if (linkedUserId) {
                await Employee.update(
                    {
                        isDeleted: true,
                        isActive: false,
                        updatedBy: context?.actor?.userId ?? null
                    },
                    {
                        where: {
                            userId: linkedUserId,
                            companyId: company.companyId,
                            isDeleted: false
                        },
                        transaction,
                        context
                    }
                );

                await User.update(
                    {
                        isDeleted: true,
                        isActive: false,
                        updatedBy: context?.actor?.userId ?? null
                    },
                    {
                        where: { id: linkedUserId, isDeleted: false },
                        transaction,
                        context
                    }
                );

                await UserRole.update(
                    {
                        isDeleted: true,
                        isActive: false,
                        updatedBy: context?.actor?.userId ?? null
                    },
                    {
                        where: { userId: linkedUserId, isDeleted: false },
                        transaction,
                        context
                    }
                );
            }

            return true;
        });
    }
};

module.exports = companyCreationService;
