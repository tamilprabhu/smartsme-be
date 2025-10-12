const { Action, RoleAction } = require("../models");
const { SYSTEM_ROLES, GUEST_ACTIONS } = require("../constants/roles");

const actionsService = {
    // Check if user roles have specific actions
    checkActions: async (roleIds, actions) => {
        // Handle GUEST role
        if (roleIds.includes(SYSTEM_ROLES.GUEST.id)) {
            return actions.reduce((acc, action) => {
                acc[action] = GUEST_ACTIONS.includes(action);
                return acc;
            }, {});
        }

        const roleActions = await RoleAction.findAll({
            where: { roleId: roleIds },
            include: [{
                model: Action,
                attributes: ['name']
            }]
        });

        const userActions = roleActions.map(ra => ra.Action.name);
        return actions.reduce((acc, action) => {
            acc[action] = userActions.includes(action);
            return acc;
        }, {});
    },

    // Get all actions for user roles
    getUserActions: async (roleIds) => {
        // Handle GUEST role
        if (roleIds.includes(SYSTEM_ROLES.GUEST.id)) {
            return GUEST_ACTIONS.map((action, index) => ({
                id: index,
                name: action,
                description: action === "READ" ? "View/Read records" : action
            }));
        }

        const roleActions = await RoleAction.findAll({
            where: { roleId: roleIds },
            include: [{
                model: Action,
                attributes: ['id', 'name', 'description']
            }]
        });

        return roleActions.map(ra => ra.Action);
    }
};

module.exports = actionsService;
