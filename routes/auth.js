const express = require("express");
const router = express.Router();
const authService = require("../services/auth");
const authenticate = require("../middlewares/authenticate");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

// POST /auth/login
router.post("/login", async (req, res) => {
    const { identifier, password } = req.body; // email, username, or mobile
    logger.info("Login attempt", { 
        identifier: identifier?.substring(0, 3) + "***", // Mask sensitive data
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    try {
        const { user, accessToken, refreshToken } = await authService.login({
            identifier,
            password,
        });
        const roles = user.Roles.map(role => ({ id: role.id, name: role.name }));
        const companies = [{
            companyId: user?.Employee?.Company?.companyId,
            companyName: user?.Employee?.Company?.companyName,
        }];
        logger.info("Login successful", { 
            userId: user.id, 
            username: user.username,
            ip: req.ip 
        });
        res.json({
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                roles,
                companies,
            },
            accessToken,
            refreshToken,
        });
    } catch (err) {
        logger.warn("Login failed", { 
            identifier: identifier?.substring(0, 3) + "***",
            error: err.message,
            ip: req.ip 
        });
        res.status(401).json({ error: err.message });
    }
});

// POST /auth/refresh
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        logger.warn("Refresh token attempt without token", { 
            ip: req.ip 
        });
        return res.status(400).json({ error: "Refresh token required" });
    }
    try {
        const result = await authService.refreshToken(refreshToken);
        logger.info("Token refresh successful", { 
            ip: req.ip 
        });
        res.json(result);
    } catch (err) {
        logger.warn("Token refresh failed", { 
            error: err.message,
            tokenProvided: !!refreshToken,
            ip: req.ip 
        });
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
    // For stateless JWT, logout is handled on client by discarding tokens
    // Optional: implement token blacklisting here
    logger.info("User logout", { 
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    res.json({ message: "Logout successful" });
});

// GET /auth/me
router.get("/me", authenticate, async (req, res) => {
    logger.debug("User info request", { 
        userId: req.auth?.sub,
        username: req.auth?.username 
    });
    try {
        const user = await authService.getUserById(req.auth.sub);
        if (!user) {
            logger.warn("User info request for non-existent user", { 
                requestedUserId: req.auth.sub,
                ip: req.ip 
            });
            return res.status(404).json({ error: "User not found" });
        }
        logger.info("User info retrieved successfully", { 
            userId: user.id,
            username: user.username 
        });
            // Populate CLAIMS
        const roles = user.Roles.map(role => ({ id: role.id, name: role.name }));
        const companies = [{
            companyId: user?.Employee?.Company?.companyId,
            companyName: user?.Employee?.Company?.companyName,
        }];
        res.json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            roles,
            companies,
        });
    } catch (err) {
        logger.error("Error retrieving user info", { 
            userId: req.auth?.sub,
            error: err.message,
            stack: err.stack 
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /auth/change-password
router.post("/change-password", authenticate, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    logger.info("Change password attempt", { 
        userId: req.auth.sub,
        username: req.auth.username,
        ip: req.ip 
    });
    try {
        await authService.changePassword(req.auth.sub, currentPassword, newPassword);
        logger.info("Password changed successfully", { 
            userId: req.auth.sub,
            username: req.auth.username 
        });
        res.json({ message: "Password changed successfully" });
    } catch (err) {
        logger.warn("Password change failed", { 
            userId: req.auth.sub,
            error: err.message,
            ip: req.ip 
        });
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
