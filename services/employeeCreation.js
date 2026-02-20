const bcrypt = require("bcrypt");
const { User, Employee, UserRole } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../db/sequelize");
const logger = require("../config/logger");
const { validateCreate: validateUser } = require("../validators/user");
const { validateCreate: validateEmployeeCreate, validateUpdate: validateEmployeeUpdate } = require("../validators/employee");
const { generateEmployeeId } = require("../utils/idGenerator");

const MAX_RETRY_ATTEMPTS = 5;

const employeeCreationService = {
    createEmployeeWithUser: async (input, context) => {
        const { user: userData, employee: employeeData, roleUser: roleUserData } = input;
        
        logger.info("EmployeeCreationService: Creating employee with user account", {
            username: userData?.username,
            companyId: context.companyId,
            actorId: context.actor?.userId
        });

        // Validate inputs
        if (!userData) {
            throw { name: 'ValidationError', errors: { user: ['user data is required'] } };
        }
        if (!employeeData) {
            throw { name: 'ValidationError', errors: { employee: ['employee data is required'] } };
        }
        if (!roleUserData?.roleId) {
            throw { name: 'ValidationError', errors: { roleId: ['roleId is required'] } };
        }

        return await sequelize.transaction(async (t) => {
            try {
                const validatedUserData = await validateUser(userData);
                
                if (validatedUserData.password) {
                    validatedUserData.password = await bcrypt.hash(validatedUserData.password, 10);
                }

                const user = await User.create(validatedUserData, { 
                    transaction: t,
                    context 
                });

                logger.info(`EmployeeCreationService: User created - ID: ${user.id}, username: ${user.username}`);

                const validatedEmployeeData = await validateEmployeeCreate({
                    ...employeeData,
                    userId: user.id
                });
                const { employeeId, ...safeEmployeeData } = validatedEmployeeData;

                const baseEmployeeData = {
                    ...safeEmployeeData,
                    userId: user.id,
                    companyId: context.companyId,
                    createdBy: context.actor?.userId,
                    updatedBy: context.actor?.userId
                };

                let employee;
                let attempts = 0;
                while (attempts < MAX_RETRY_ATTEMPTS) {
                    try {
                        employee = await Employee.create({
                            ...baseEmployeeData,
                            employeeId: generateEmployeeId()
                        }, {
                            transaction: t,
                            context
                        });
                        break;
                    } catch (error) {
                        const isUniqueError = error.name === "SequelizeUniqueConstraintError" &&
                            error.errors?.some((e) => e.path === "employee_id" || e.path === "employeeId");

                        if (isUniqueError) {
                            attempts++;
                            if (attempts >= MAX_RETRY_ATTEMPTS) {
                                throw new Error("Failed to generate unique employee_id after maximum retries");
                            }
                            logger.warn(`EmployeeCreationService: Duplicate employee_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                        } else {
                            throw error;
                        }
                    }
                }

                logger.info(`EmployeeCreationService: Employee created - ID: ${employee.employeeSequence}, userId: ${user.id}`);

                await UserRole.create({
                    userId: user.id,
                    roleId: roleUserData.roleId,
                    createdBy: context.actor?.userId,
                    updatedBy: context.actor?.userId
                }, { 
                    transaction: t,
                    context 
                });

                logger.info(`EmployeeCreationService: Role mapped - userId: ${user.id}, roleId: ${roleUserData.roleId}`);

                // Return combined result without password
                const { password, ...userWithoutPassword } = user.toJSON();
                
                return {
                    employeeSequence: employee.employeeSequence,
                    employeeId: employee.employeeId,
                    userId: user.id,
                    companyId: employee.companyId,
                    salary: employee.salary,
                    activeFlag: employee.activeFlag,
                    user: userWithoutPassword,
                    roleId: roleUserData.roleId
                };
            } catch (error) {
                logger.error("EmployeeCreationService: Transaction failed", {
                    error: error.message,
                    stack: error.stack,
                    username: userData?.username
                });
                throw error;
            }
        });
    },

    getAllEmployeesWithUser: async (page, itemsPerPage, search, companyId, sortBy, sortOrder) => {
        logger.info("EmployeeCreationService: Fetching employees with user details", {
            page, itemsPerPage, search, companyId
        });

        try {
            const offset = (page - 1) * itemsPerPage;
            
            const whereClause = { companyId, isDeleted: false };
            
            const userWhere = { isDeleted: false };
            const roleWhere = { isDeleted: false };
            
            if (search) {
                userWhere[Op.or] = [
                    { username: { [Op.like]: `%${search}%` } },
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } },
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { mobile: { [Op.like]: `%${search}%` } }
                ];
                
                roleWhere[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } }
                ];
            }

            const { count, rows } = await Employee.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        required: true,
                        where: userWhere,
                        attributes: { exclude: ['password'] },
                        include: [{
                            model: UserRole,
                            required: false,
                            where: { isDeleted: false },
                            attributes: ['roleId'],
                            include: [{
                                model: require("../models").Role,
                                required: false,
                                where: roleWhere,
                                attributes: ['id', 'name']
                            }]
                        }]
                    }
                ],
                limit: itemsPerPage,
                offset,
                order: [['employeeSequence', sortOrder === 'ASC' ? 'ASC' : 'DESC']],
                distinct: true
            });

            logger.info(`EmployeeCreationService: Retrieved ${rows.length} employees with user details`);

            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / itemsPerPage),
                    itemsPerPage,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error("EmployeeCreationService: Failed to fetch employees with user", {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    getEmployeeWithUserByEmployeeSequence: async (employeeSequence, companyId) => {
        logger.info(`EmployeeCreationService: Fetching employee by employeeSequence: ${employeeSequence}, companyId: ${companyId}`);

        try {
            const employee = await Employee.findOne({
                where: { employeeSequence, companyId, isDeleted: false },
                include: [
                    {
                        model: User,
                        required: true,
                        where: { isDeleted: false },
                        attributes: { exclude: ['password'] },
                        include: [{
                            model: UserRole,
                            required: false,
                            where: { isDeleted: false },
                            attributes: ['roleId']
                        }]
                    }
                ]
            });

            if (!employee) {
                logger.warn(`EmployeeCreationService: Employee not found - employeeSequence: ${employeeSequence}`);
                return null;
            }

            logger.info(`EmployeeCreationService: Retrieved employee - employeeSequence: ${employeeSequence}`);
            return employee;
        } catch (error) {
            logger.error(`EmployeeCreationService: Failed to fetch employee - employeeSequence: ${employeeSequence}`, {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    updateEmployeeWithUser: async (employeeSequence, input, context) => {
        const { user: userData, employee: employeeData, roleUser: roleUserData } = input;

        logger.info(`EmployeeCreationService: Updating employee - employeeSequence: ${employeeSequence}`, {
            companyId: context.companyId,
            actorId: context.actor?.userId
        });

        return await sequelize.transaction(async (t) => {
            try {
                const employee = await Employee.findOne({
                    where: { employeeSequence, companyId: context.companyId, isDeleted: false },
                    transaction: t
                });

                if (!employee) {
                    throw new Error('Employee not found');
                }

                const userId = employee.userId;

                if (userData && Object.keys(userData).length > 0) {
                    const { password, ...updateData } = userData;
                    
                    if (password) {
                        updateData.password = await bcrypt.hash(password, 10);
                    }

                    await User.update(updateData, {
                        where: { id: userId, isDeleted: false },
                        transaction: t,
                        context
                    });

                    logger.info(`EmployeeCreationService: User updated - userId: ${userId}`);
                }

                if (employeeData && Object.keys(employeeData).length > 0) {
                    const validatedEmployeeData = await validateEmployeeUpdate(employeeData);
                    const { employeeId, ...safeEmployeeData } = validatedEmployeeData;
                    await Employee.update({
                        ...safeEmployeeData,
                        updatedBy: context.actor?.userId
                    }, {
                        where: { employeeSequence, companyId: context.companyId, isDeleted: false },
                        transaction: t,
                        context
                    });

                    logger.info(`EmployeeCreationService: Employee updated - userId: ${userId}`);
                }

                if (roleUserData?.roleId) {
                    await UserRole.update({
                        roleId: roleUserData.roleId,
                        updatedBy: context.actor?.userId
                    }, {
                        where: { userId, isDeleted: false },
                        transaction: t,
                        context
                    });

                    logger.info(`EmployeeCreationService: Role updated - userId: ${userId}, roleId: ${roleUserData.roleId}`);
                }

                const updatedEmployee = await Employee.findOne({
                    where: { employeeSequence, companyId: context.companyId },
                    include: [
                        {
                            model: User,
                            attributes: { exclude: ['password'] },
                            include: [{
                                model: UserRole,
                                where: { isDeleted: false },
                                required: false,
                                attributes: ['roleId']
                            }]
                        }
                    ],
                    transaction: t
                });

                return updatedEmployee;
            } catch (error) {
                logger.error(`EmployeeCreationService: Update failed - employeeSequence: ${employeeSequence}`, {
                    error: error.message,
                    stack: error.stack
                });
                throw error;
            }
        });
    },

    deleteEmployeeWithUser: async (employeeSequence, context) => {
        logger.info(`EmployeeCreationService: Deleting employee - employeeSequence: ${employeeSequence}`, {
            companyId: context.companyId,
            actorId: context.actor?.userId
        });

        return await sequelize.transaction(async (t) => {
            try {
                const employee = await Employee.findOne({
                    where: { employeeSequence, companyId: context.companyId, isDeleted: false },
                    transaction: t
                });

                if (!employee) {
                    throw new Error('Employee not found');
                }

                const userId = employee.userId;

                await Employee.update({
                    isDeleted: true,
                    isActive: false,
                    updatedBy: context.actor?.userId
                }, {
                    where: { employeeSequence, companyId: context.companyId, isDeleted: false },
                    transaction: t,
                    context
                });

                await User.update({
                    isDeleted: true,
                    isActive: false,
                    updatedBy: context.actor?.userId
                }, {
                    where: { id: userId, isDeleted: false },
                    transaction: t,
                    context
                });

                await UserRole.update({
                    isDeleted: true,
                    isActive: false,
                    updatedBy: context.actor?.userId
                }, {
                    where: { userId, isDeleted: false },
                    transaction: t,
                    context
                });

                logger.info(`EmployeeCreationService: Employee deleted - employeeSequence: ${employeeSequence}`);
                return true;
            } catch (error) {
                logger.error(`EmployeeCreationService: Delete failed - employeeSequence: ${employeeSequence}`, {
                    error: error.message,
                    stack: error.stack
                });
                throw error;
            }
        });
    }
};

module.exports = employeeCreationService;
