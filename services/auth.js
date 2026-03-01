const bcrypt = require('bcrypt');
const logger = require('../config/logger');
const userRepository = require('../repositories/userRepository');
const TokenFactory = require('../factories/tokenFactory');

// Service functions
const authService = {
    // Login user by email/username + password
    login: async ({ identifier, password }) => {
        logger.debug('Login service called', { identifier: identifier?.substring(0, 3) + '***' });
        try {
            const user = await userRepository.findByIdentifier(identifier);
            if (!user) {
                logger.warn('Login attempt for non-existent user', {
                    identifier: identifier?.substring(0, 3) + '***',
                });
                throw new Error('User not found');
            }

            logger.debug('User found, verifying password', {
                userId: user.id,
                username: user.username,
            });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                logger.warn('Invalid password attempt', {
                    userId: user.id,
                    username: user.username,
                });
                throw new Error('Invalid password');
            }
            logger.debug('Password verified successfully', {
                userId: user.id,
                username: user.username,
            });

            const accessToken = TokenFactory.createAccessToken(user);
            const refreshToken = TokenFactory.createRefreshToken(user.id);

            logger.info('Tokens generated successfully', {
                userId: user.id,
                username: user.username,
            });
            return { user, accessToken, refreshToken };
        } catch (error) {
            logger.error('Login service error', {
                identifier: identifier?.substring(0, 3) + '***',
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    // Refresh access token
    refreshToken: async (refreshToken) => {
        logger.debug('Refresh token service called');
        try {
            const decoded = TokenFactory.verifyRefreshToken(refreshToken);

            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }

            const user = await userRepository.findByIdWithClaims(decoded.sub);
            if (!user) {
                throw new Error('User not found');
            }

            const newAccessToken = TokenFactory.createAccessToken(user);

            logger.info('Access token refreshed successfully', { userId: user.id });
            return { accessToken: newAccessToken };
        } catch (error) {
            logger.error('Refresh token service error', { error: error.message });
            throw error;
        }
    },

    // Find user by ID
    getUserById: async (id) => {
        logger.debug('getUserById service called', { userId: id });
        try {
            const user = await userRepository.findByIdWithClaims(id);
            if (!user) {
                logger.warn('User not found in getUserById', { userId: id });
                throw new Error('User not found');
            }
            logger.debug('User found successfully', { userId: user.id, username: user.username });
            return user;
        } catch (error) {
            logger.error('getUserById service error', { userId: id, error: error.message });
            throw error;
        }
    },

    // Logout (placeholder for token blacklisting)
    logout: async (token) => {
        logger.debug('Logout service called');
        try {
            // TODO: Implement token blacklisting in Redis/Database
            logger.info('User logged out successfully');
            return { message: 'Logged out successfully' };
        } catch (error) {
            logger.error('Logout service error', { error: error.message });
            throw error;
        }
    },

    // Change password
    changePassword: async (userId, currentPassword, newPassword) => {
        logger.debug('Change password service called', { userId });
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                logger.warn('Invalid current password', { userId });
                throw new Error('Current password is incorrect');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await userRepository.updatePassword(userId, hashedPassword);

            logger.info('Password changed successfully', { userId });
            return { message: 'Password changed successfully' };
        } catch (error) {
            logger.error('Change password service error', { userId, error: error.message });
            throw error;
        }
    },
};

module.exports = authService;
