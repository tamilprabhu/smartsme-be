const { Employee, User, UserRole, Role } = require("../models");
const { Op, col, where } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { validateCreate, validateUpdate } = require("../validators/employee");

const employeeService = {
    getAllEmployees: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null, sortBy = SortBy.SEQUENCE, sortOrder = SortOrder.DESC) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`EmployeeService: Fetching employees - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            let whereClause = {};
            
            // Add company filter if provided
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            // Add search filter if provided
            if (search) {
                whereClause[Op.and] = [
                    ...(companyId ? [{ companyId }] : []),
                    {
                        [Op.or]: [
                            { userId: { [Op.like]: `%${search}%` } },
                            { salary: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Employee.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'employee_seq', 'Employee')
            });
            logger.info(`EmployeeService: Successfully retrieved ${rows.length} employees out of ${count} total for company: ${companyId}`);
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / validLimit),
                    itemsPerPage: validLimit,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error("EmployeeService: Failed to fetch employees", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getEmployeeById: async (id, companyId) => {
        logger.info(`EmployeeService: Fetching employee with ID: ${id} for company: ${companyId}`);
        try {
            const whereClause = { employeeSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const employee = await Employee.findOne({ where: whereClause });
            if (employee) {
                logger.info(`EmployeeService: Successfully retrieved employee (ID: ${id}) for company: ${companyId}`);
            } else {
                logger.warn(`EmployeeService: Employee not found with ID: ${id} for company: ${companyId}`);
            }
            return employee;
        } catch (error) {
            logger.error(`EmployeeService: Failed to fetch employee with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createEmployee: async (employeeData, companyId, userId) => {
        logger.info(`EmployeeService: Creating new employee for user: ${employeeData.userId}, company: ${companyId}`);
        try {
            const validatedData = await validateCreate(employeeData);
            const employee = await Employee.create({
                ...validatedData,
                companyId,
                createUserId: userId,
                updateUserId: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info(`EmployeeService: Successfully created employee (ID: ${employee.employeeSequence}) for company: ${companyId}`);
            return employee;
        } catch (error) {
            logger.error(`EmployeeService: Failed to create employee`, { 
                error: error.message, 
                employeeData: employeeData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateEmployee: async (id, employeeData, companyId, userId) => {
        logger.info(`EmployeeService: Updating employee with ID: ${id} for company: ${companyId}`, { updateData: employeeData });
        try {
            const validatedData = await validateUpdate(employeeData);
            const whereClause = { employeeSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await Employee.update({
                ...validatedData,
                updateUserId: userId,
                updatedAt: new Date()
            }, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`EmployeeService: No employee found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Employee not found");
            }
            const updatedEmployee = await Employee.findOne({ where: whereClause });
            logger.info(`EmployeeService: Successfully updated employee (ID: ${id}) for company: ${companyId}`);
            return updatedEmployee;
        } catch (error) {
            logger.error(`EmployeeService: Failed to update employee with ID: ${id}`, { 
                error: error.message, 
                updateData: employeeData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteEmployee: async (id, companyId, userId) => {
        logger.info(`EmployeeService: Deleting employee with ID: ${id} for company: ${companyId}`);
        try {
            const whereClause = { employeeSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const employee = await Employee.findOne({ where: whereClause });
            if (!employee) {
                logger.warn(`EmployeeService: No employee found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Employee not found");
            }
            
            const [updatedRows] = await Employee.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`EmployeeService: Employee already deleted with ID: ${id} for company: ${companyId}`);
                throw new Error("Employee not found");
            }
            logger.info(`EmployeeService: Successfully soft deleted employee (ID: ${id}) for company: ${companyId}`);
            return { message: "Employee deleted successfully" };
        } catch (error) {
            logger.error(`EmployeeService: Failed to delete employee with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getEmployeesByRole: async (roleNames, companyId, options = {}) => {
        const safeRoleNames = Array.isArray(roleNames) ? roleNames : [roleNames];
        const {
            excludeUserId,
            page = 1,
            itemsPerPage = ItemsPerPage.TEN,
            search = '',
            sortBy = SortBy.SEQUENCE,
            sortOrder = SortOrder.DESC
        } = options;

        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`EmployeeService: Fetching employees with roles: ${safeRoleNames.join(', ')} for company: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            const employeeWhere = {
                companyId,
                isActive: true,
                isDeleted: false,
                ...(excludeUserId ? { userId: { [Op.ne]: excludeUserId } } : {})
            };

            if (search) {
                employeeWhere[Op.or] = [
                    { employeeSequence: { [Op.like]: `%${search}%` } },
                    { userId: { [Op.like]: `%${search}%` } },
                    where(col('User.first_name'), { [Op.like]: `%${search}%` }),
                    where(col('User.last_name'), { [Op.like]: `%${search}%` }),
                    where(col('User.name'), { [Op.like]: `%${search}%` }),
                    where(col('User.email'), { [Op.like]: `%${search}%` }),
                    where(col('User.mobile'), { [Op.like]: `%${search}%` })
                ];
            }

            const userWhere = {
                isActive: true,
                isDeleted: false
            };

            const { count, rows } = await Employee.findAndCountAll({
                where: {
                    ...employeeWhere
                },
                distinct: true,
                subQuery: false,
                limit: validLimit,
                offset,
                order: buildSortOrder(sortBy, sortOrder, 'employee_seq', 'Employee'),
                include: [{
                    model: User,
                    required: true,
                    where: userWhere,
                    include: [{
                        model: Role,
                        through: {
                            model: UserRole,
                            attributes: [],
                            where: { isActive: true, isDeleted: false }
                        },
                        where: {
                            name: { [Op.in]: safeRoleNames },
                            isActive: true,
                            isDeleted: false
                        },
                        required: true
                    }]
                }]
            });

            logger.info(`EmployeeService: Successfully retrieved ${rows.length} employees with roles: ${safeRoleNames.join(', ')}`);
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / validLimit),
                    itemsPerPage: validLimit,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error(`EmployeeService: Failed to fetch employees by roles: ${safeRoleNames.join(', ')}`, {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    toEmployeeDropdownList: (employees) => {
        const uniqueByUserId = new Map();
        for (const employee of employees) {
            if (!uniqueByUserId.has(employee.userId)) {
                const user = employee.User;
                const displayName = (user?.firstName && user?.lastName)
                    ? `${user.firstName} ${user.lastName}`
                    : (user?.name || `User ${employee.userId}`);
                uniqueByUserId.set(employee.userId, {
                    value: employee.userId,
                    label: `${displayName} (${employee.employeeSequence})`,
                    userId: employee.userId,
                    employeeId: employee.employeeSequence
                });
            }
        }
        return Array.from(uniqueByUserId.values());
    }
};

module.exports = employeeService;
