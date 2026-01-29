const jwt = require("jsonwebtoken");
const logger = require('./../config/logger');

// Middleware to authenticate access token
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Validate token type
        if (decoded.type !== "access") {
            return res.status(401).json({ error: "Invalid token type" });
        }
        
        // Validate issuer and audience
        if (decoded.iss !== "smartsme-api" || decoded.aud !== "smartsme-client") {
            return res.status(401).json({ error: "Invalid token issuer or audience" });
        }

        // Validate REQUIRED claims
        if (
            !decoded.sub ||
            !Array.isArray(decoded.companies) ||
            !Array.isArray(decoded.roles) ||
            decoded.roles.length === 0
        ) {
            logger.warn("JWT missing required claims", {
                sub: decoded?.sub,
                companies: decoded?.companies,
                roles: decoded?.roles
            });
            return res.status(401).json({ message: "Invalid authentication token" });
        }
        req.auth = decoded;
        
        // Add convenience method for primary company ID
        req.auth.getPrimaryCompanyId = () => decoded.companies?.[0]?.companyId || null;
        
        next();
    } catch (err) {
        logger.warn("JWT authentication failed", {
            reason: err.name,
            message: err.message,
            path: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticate;
