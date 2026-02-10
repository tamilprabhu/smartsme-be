const { Employee, User, UserRole, Role } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const employeeService = {
    getAllEmployees: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
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
                order: [['employeeIdSeq', 'ASC']]
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
            const whereClause = { employeeIdSeq: id };
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
            const employee = await Employee.create({
                ...employeeData,
                companyId,
                createUserId: userId,
                updateUserId: userId,
                createDate: new Date(),
                updateDate: new Date()
            });
            logger.info(`EmployeeService: Successfully created employee (ID: ${employee.employeeIdSeq}) for company: ${companyId}`);
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
            const whereClause = { employeeIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await Employee.update({
                ...employeeData,
                updateUserId: userId,
                updateDate: new Date()
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
            const whereClause = { employeeIdSeq: id };
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

    getEmployeesByRole: async (roleName, companyId) => {
        logger.info(`EmployeeService: Fetching employees with role: ${roleName} for company: ${companyId}`);
        try {
            const employees = await Employee.findAll({
                where: { companyId },
                include: [{
                    model: User,
                    required: true,
                    include: [{
                        model: Role,
                        through: { 
                            model: UserRole,
                            attributes: []
                        },
                        where: { name: roleName },
                        required: true
                    }]
                }]
            });
            logger.info(`EmployeeService: Successfully retrieved ${employees.length} employees with role: ${roleName}`);
            return employees;
        } catch (error) {
            logger.error(`EmployeeService: Failed to fetch employees by role: ${roleName}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = employeeService;
