// routes/auth.js
const express = require("express");
const router = express.Router();
const authService = require("../services/auth");
const authenticate = require("../middlewares/authenticate");
const jwt = require("jsonwebtoken");

// POST /auth/login
router.post("/login", async (req, res) => {
    const { identifier, password } = req.body; // email, username, or mobile

    try {
        const { user, accessToken, refreshToken } = await authService.login({
            identifier,
            password,
        });

        res.json({
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
            accessToken,
            refreshToken,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

// POST /auth/refresh
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: payload.id, username: payload.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
    // For stateless JWT, logout is handled on client by discarding tokens
    // Optional: implement token blacklisting here
    res.json({ message: "Logout successful" });
});

// GET /auth/userinfo
router.get("/userinfo", authenticate, async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;