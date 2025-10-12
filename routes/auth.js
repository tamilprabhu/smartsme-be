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
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        logger.info("Token refresh successful", { 
            userId: payload.id, 
            username: payload.username,
            ip: req.ip 
        });
        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: payload.id, username: payload.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );
        res.json({ accessToken: newAccessToken });
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

// GET /auth/userinfo
router.get("/userinfo", authenticate, async (req, res) => {
    logger.debug("User info request", { 
        userId: req.user?.id,
        username: req.user?.username 
    });
    try {
        const user = await authService.getUserById(req.user.id);
        if (!user) {
            logger.warn("User info request for non-existent user", { 
                requestedUserId: req.user.id,
                ip: req.ip 
            });
            return res.status(404).json({ error: "User not found" });
        }
        logger.info("User info retrieved successfully", { 
            userId: user.id,
            username: user.username 
        });
        res.json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
        });
    } catch (err) {
        logger.error("Error retrieving user info", { 
            userId: req.user?.id,
            error: err.message,
            stack: err.stack 
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
