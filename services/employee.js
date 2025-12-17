const { Employee } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const employeeService = {
    getAllEmployees: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`EmployeeService: Fetching employees - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { companyId: { [Op.like]: `%${search}%` } },
                    { userId: { [Op.like]: `%${search}%` } },
                    { salary: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Employee.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['employeeIdSeq', 'ASC']]
            });
            logger.info(`EmployeeService: Successfully retrieved ${rows.length} employees out of ${count} total`);
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

    getEmployeeById: async (id) => {
        logger.info(`EmployeeService: Fetching employee with ID: ${id}`);
        try {
            const employee = await Employee.findByPk(id);
            if (employee) {
                logger.info(`EmployeeService: Successfully retrieved employee (ID: ${id})`);
            } else {
                logger.warn(`EmployeeService: Employee not found with ID: ${id}`);
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

    createEmployee: async (employeeData) => {
        logger.info(`EmployeeService: Creating new employee for user: ${employeeData.userId}`);
        try {
            const employee = await Employee.create({
                ...employeeData,
                createDate: new Date(),
                updateDate: new Date()
            });
            logger.info(`EmployeeService: Successfully created employee (ID: ${employee.employeeIdSeq})`);
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

    updateEmployee: async (id, employeeData) => {
        logger.info(`EmployeeService: Updating employee with ID: ${id}`, { updateData: employeeData });
        try {
            const [updatedRows] = await Employee.update({
                ...employeeData,
                updateDate: new Date()
            }, {
                where: { employeeIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`EmployeeService: No employee found to update with ID: ${id}`);
                throw new Error("Employee not found");
            }
            const updatedEmployee = await Employee.findByPk(id);
            logger.info(`EmployeeService: Successfully updated employee (ID: ${id})`);
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

    deleteEmployee: async (id) => {
        logger.info(`EmployeeService: Deleting employee with ID: ${id}`);
        try {
            const employee = await Employee.findByPk(id);
            const deletedRows = await Employee.destroy({
                where: { employeeIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`EmployeeService: No employee found to delete with ID: ${id}`);
                throw new Error("Employee not found");
            }
            logger.info(`EmployeeService: Successfully deleted employee (ID: ${id})`);
            return { message: "Employee deleted successfully" };
        } catch (error) {
            logger.error(`EmployeeService: Failed to delete employee with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = employeeService;
