const { User } = require("../models");
const logger = require("../config/logger");

const userService = {
    // Get all users
    getAllUsers: async () => {
        logger.info("UserService: Fetching all users");
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] } // Exclude password from response
            });
            logger.info(`UserService: Successfully retrieved ${users.length} users`);
            return users;
        } catch (error) {
            logger.error("UserService: Failed to fetch users", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        logger.info(`UserService: Fetching user with ID: ${id}`);
        try {
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            if (user) {
                logger.info(`UserService: Successfully retrieved user: ${user.username} (ID: ${id})`);
            } else {
                logger.warn(`UserService: User not found with ID: ${id}`);
            }
            return user;
        } catch (error) {
            logger.error(`UserService: Failed to fetch user with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new user
    createUser: async (userData) => {
        logger.info("UserService: Creating new user", { username: userData.username });
        try {
            const user = await User.create(userData);
            logger.info(`UserService: Successfully created user: ${user.username} (ID: ${user.id})`);
            // Return user without password
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        } catch (error) {
            logger.error("UserService: Failed to create user", { 
                username: userData.username,
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        logger.info(`UserService: Updating user with ID: ${id}`, { updates: Object.keys(userData) });
        try {
            const [updatedRowsCount] = await User.update(userData, {
                where: { id }
            });
            
            if (updatedRowsCount === 0) {
                logger.warn(`UserService: No user found to update with ID: ${id}`);
                return null;
            }
            
            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            logger.info(`UserService: Successfully updated user: ${updatedUser.username} (ID: ${id})`);
            return updatedUser;
        } catch (error) {
            logger.error(`UserService: Failed to update user with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        logger.info(`UserService: Deleting user with ID: ${id}`);
        try {
            const user = await User.findByPk(id);
            if (!user) {
                logger.warn(`UserService: User not found for deletion with ID: ${id}`);
                return false;
            }
            
            await User.destroy({ where: { id } });
            logger.info(`UserService: Successfully deleted user: ${user.username} (ID: ${id})`);
            return true;
        } catch (error) {
            logger.error(`UserService: Failed to delete user with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = userService;
