const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { User, Role, Employee } = require("../models");
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
                },{
                    model: Employee,
                    attributes: ['companyId']
                }]
            });
            if (!user) {
                logger.warn("Login attempt for non-existent user", { identifier: identifier?.substring(0, 3) + "***" });
                throw new Error("User not found");
            }

            logger.debug("User found, verifying password", { userId: user.id, username: user.username });
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                logger.warn("Invalid password attempt", { userId: user.id, username: user.username });
                throw new Error("Invalid password");
            }
            logger.debug("Password verified successfully", { userId: user.id, username: user.username });
            
            // Generate tokens with industry standards
            const roles = user.Roles.map(role => ({ id: role.id, name: role.name }));
            
            // Access token with roles (short-lived)
            const accessToken = jwt.sign(
                { 
                    iss: "smartsme-api",
                    aud: "smartsme-client",
                    sub: user.id.toString(),
                    jti: crypto.randomUUID(),
                    username: user.username,
                    roles: roles,
                    companyId: user.Employee?.companyId,
                    type: "access"
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
            );
            
            // Refresh token minimal (long-lived)
            const refreshToken = jwt.sign(
                { 
                    iss: "smartsme-api",
                    aud: "smartsme-client",
                    sub: user.id.toString(),
                    jti: crypto.randomUUID(),
                    type: "refresh"
                },
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

    // Refresh access token
    refreshToken: async (refreshToken) => {
        logger.debug("Refresh token service called");
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            
            // Validate token type
            if (decoded.type !== "refresh") {
                throw new Error("Invalid token type");
            }

            // Fetch fresh user data from database
            const user = await User.findByPk(decoded.sub, {
                include: [{
                    model: Role,
                    attributes: ['id', 'name']
                }]
            });

            if (!user) {
                throw new Error("User not found");
            }

            // Generate new access token with fresh roles
            const roles = user.Roles.map(role => ({ id: role.id, name: role.name }));

            const newAccessToken = jwt.sign(
                { 
                    iss: "smartsme-api",
                    aud: "smartsme-client",
                    sub: user.id.toString(),
                    jti: crypto.randomUUID(),
                    username: user.username,
                    roles: roles,
                    type: "access"
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
            );

            logger.info("Access token refreshed successfully", { userId: user.id });
            return { accessToken: newAccessToken };
        } catch (error) {
            logger.error("Refresh token service error", { error: error.message });
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
                logger.warn("User not found in getUserById", { userId: id });
                throw new Error("User not found");
            }
            logger.debug("User found successfully", { userId: user.id, username: user.username });
            return user;
        } catch (error) {
            logger.error("getUserById service error", { userId: id, error: error.message });
            throw error;
        }
    },

    // Logout (placeholder for token blacklisting)
    logout: async (token) => {
        logger.debug("Logout service called");
        try {
            // TODO: Implement token blacklisting in Redis/Database
            logger.info("User logged out successfully");
            return { message: "Logged out successfully" };
        } catch (error) {
            logger.error("Logout service error", { error: error.message });
            throw error;
        }
    }
};

module.exports = authService;
