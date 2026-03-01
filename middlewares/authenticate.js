const TokenFactory = require('../factories/tokenFactory');
const AuthClaims = require('../domain/AuthClaims');
const logger = require('./../config/logger');

// Middleware to authenticate access token
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = TokenFactory.verifyAccessToken(token);
        const authClaims = new AuthClaims(decoded);
        authClaims.validate();

        req.auth = authClaims;
        next();
    } catch (err) {
        logger.warn('JWT authentication failed', {
            reason: err.name,
            message: err.message,
            path: req.originalUrl,
            method: req.method,
            ip: req.ip,
        });
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
