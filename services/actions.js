const { Action, RoleAction } = require("../models");

const actionsService = {
    // Check if user roles have specific actions
    checkActions: async (roleIds, actions) => {
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
