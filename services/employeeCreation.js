const bcrypt = require("bcrypt");
const { User, Employee, UserRole } = require("../models");
const sequelize = require("../db/sequelize");
const logger = require("../config/logger");
const { validateCreate: validateUser } = require("../validators/user");

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

                const employee = await Employee.create({
                    ...employeeData,
                    userId: user.id,
                    companyId: context.companyId,
                    createdBy: context.actor?.userId,
                    updatedBy: context.actor?.userId
                }, { 
                    transaction: t,
                    context 
                });

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
    }
};

module.exports = employeeCreationService;
