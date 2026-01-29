const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { SYSTEM_ROLES } = require("../constants/roles");

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // No token - treat as GUEST
        req.auth = {
            id: null,
            username: "guest",
            roles: [SYSTEM_ROLES.GUEST]
        };
        logger.debug("Request treated as GUEST", { ip: req.ip });
        return next();
    }

    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = decoded;
        logger.debug("Authenticated user", { userId: decoded.id, username: decoded.username });
        next();
    } catch (err) {
        // Invalid token - treat as GUEST
        req.auth = {
            id: null,
            username: "guest",
            roles: [SYSTEM_ROLES.GUEST]
        };
        logger.debug("Invalid token, treated as GUEST", { ip: req.ip, error: err.message });
        next();
    }
};

module.exports = optionalAuth;
