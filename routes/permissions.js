const express = require("express");
const router = express.Router();
const permissionsService = require("../services/permissions");
const optionalAuth = require("../middlewares/optionalAuth");

// POST /permissions/check
router.post("/check", optionalAuth, async (req, res) => {
    try {
        const { permissions } = req.body;
        const userRoles = req.user.roles || [];
        
        if (!permissions || !Array.isArray(permissions)) {
            return res.status(400).json({ error: "permissions array required" });
        }

        const roleIds = userRoles.map(role => role.id);
        const hasPermissions = await permissionsService.checkPermissions(roleIds, permissions);

        res.json({ hasPermissions });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /permissions/me
router.get("/me", optionalAuth, async (req, res) => {
    try {
        const userRoles = req.user.roles || [];
        const roleIds = userRoles.map(role => role.id);
        
        const permissions = await permissionsService.getUserPermissions(roleIds);
        res.json({ permissions });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
