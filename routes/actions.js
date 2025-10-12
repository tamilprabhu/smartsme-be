const express = require("express");
const router = express.Router();
const actionsService = require("../services/actions");
const optionalAuth = require("../middlewares/optionalAuth");

// POST /actions/check
router.post("/check", optionalAuth, async (req, res) => {
    try {
        const { actions } = req.body;
        const userRoles = req.user.roles || [];
        
        if (!actions || !Array.isArray(actions)) {
            return res.status(400).json({ error: "actions array required" });
        }

        const roleIds = userRoles.map(role => role.id);
        const hasActions = await actionsService.checkActions(roleIds, actions);

        res.json({ hasActions });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /actions/me
router.get("/me", optionalAuth, async (req, res) => {
    try {
        const userRoles = req.user.roles || [];
        const roleIds = userRoles.map(role => role.id);
        
        const actions = await actionsService.getUserActions(roleIds);
        res.json({ actions });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
