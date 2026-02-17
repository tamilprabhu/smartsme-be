const bcrypt = require("bcrypt");
const { User } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");

const userService = {
    // Get all users with pagination and search
    getAllUsers: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`UserService: Fetching users - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { username: { [Op.like]: `%${search}%` } },
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await User.findAndCountAll({
                where: whereClause,
                attributes: { exclude: ['password'] },
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'id', 'User')
            });
            logger.info(`UserService: Successfully retrieved ${rows.length} users out of ${count} total`);
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
    createUser: async (userData, context) => {
        logger.info("UserService: Creating new user", { 
            username: userData.username,
            actorId: context.actor?.userId 
        });
        try {
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            const user = await User.create(userData, { context });
            logger.info(`UserService: Successfully created user: ${user.username} (ID: ${user.id})`);
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
    updateUser: async (id, userData, context) => {
        logger.info(`UserService: Updating user with ID: ${id}`, { 
            updates: Object.keys(userData),
            actorId: context.actor?.userId 
        });
        try {
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            const [updatedRowsCount] = await User.update(userData, {
                where: { id },
                context
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
    deleteUser: async (id, context) => {
        logger.info(`UserService: Deleting user with ID: ${id}`, { actorId: context.actor?.userId });
        try {
            const user = await User.findByPk(id);
            if (!user) {
                logger.warn(`UserService: User not found for deletion with ID: ${id}`);
                return false;
            }
            
            const [updatedRows] = await User.update(
                { isDeleted: true, isActive: false },
                { where: { id, isDeleted: false }, context }
            );
            if (updatedRows === 0) {
                logger.warn(`UserService: User already deleted with ID: ${id}`);
                return false;
            }
            logger.info(`UserService: Successfully soft deleted user: ${user.username} (ID: ${id})`);
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
