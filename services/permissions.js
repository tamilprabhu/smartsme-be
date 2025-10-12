const { Permission, RolePermission } = require("../models");

const permissionsService = {
    // Check if user roles have specific permissions
    checkPermissions: async (roleIds, permissions) => {
        const rolePermissions = await RolePermission.findAll({
            where: { roleId: roleIds },
            include: [{
                model: Permission,
                attributes: ['name']
            }]
        });

        const userPermissions = rolePermissions.map(rp => rp.Permission.name);
        return permissions.reduce((acc, permission) => {
            acc[permission] = userPermissions.includes(permission);
            return acc;
        }, {});
    },

    // Get all permissions for user roles
    getUserPermissions: async (roleIds) => {
        const rolePermissions = await RolePermission.findAll({
            where: { roleId: roleIds },
            include: [{
                model: Permission,
                attributes: ['id', 'name', 'resource']
            }]
        });

        return rolePermissions.map(rp => rp.Permission);
    }
};

module.exports = permissionsService;
