const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Role } = require("../models");
const logger = require("../config/logger");

// Service functions
const authService = {
    // Login user by email/username + password
    login: async ({ identifier, password }) => {
        logger.debug("Login service called", { identifier: identifier?.substring(0, 3) + "***" });
        try {
            // Find user by email, username, or mobile
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: identifier },
                        { username: identifier },
                        { mobile: identifier }
                    ]
                },
                include: [{
                    model: Role,
                    attributes: ['id', 'name']
                }]
            });
            if (!user) {
                logger.warn("Login attempt for non-existent user", { identifier: identifier?.substring(0, 3) + "***" });
                throw new Error("User not found");
            }
            logger.debug("User found for login", { userId: user.id, username: user.username });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                logger.warn("Invalid password attempt", { userId: user.id, username: user.username });
                throw new Error("Invalid password");
            }
            logger.debug("Password verified successfully", { userId: user.id, username: user.username });
            // Generate tokens
            const roles = user.Roles.map(role => ({ id: role.id, name: role.name }));
            const accessToken = jwt.sign(
                { id: user.id, username: user.username, roles },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
            );
            const refreshToken = jwt.sign(
                { id: user.id, username: user.username, roles },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
            );
            logger.info("Tokens generated successfully", { userId: user.id, username: user.username });
            return { user, accessToken, refreshToken };
        } catch (error) {
            logger.error("Login service error", {
                identifier: identifier?.substring(0, 3) + "***",
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },
    // Find user by ID
    getUserById: async (id) => {
        logger.debug("getUserById service called", { userId: id });
        try {
            const user = await User.findByPk(id, {
                include: [{
                    model: Role,
                    attributes: ['id', 'name']
                }]
            });
            if (!user) {
                logger.warn("User not found by ID", { userId: id });
                return null;
            }
            logger.debug("User retrieved successfully", { userId: user.id, username: user.username });
            return user;
        } catch (error) {
            logger.error("getUserById service error", {
                userId: id,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },
    // Optional: hash password before creating user
    hashPassword: async (password) => {
        logger.debug("Password hashing requested");
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            logger.debug("Password hashed successfully");
            return hashedPassword;
        } catch (error) {
            logger.error("Password hashing error", {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },
};

module.exports = authService;
