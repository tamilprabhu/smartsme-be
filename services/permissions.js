const { Permission, RolePermission } = require("../models");
const { SYSTEM_ROLES, GUEST_PERMISSIONS } = require("../constants/roles");

const permissionsService = {
    // Check if user roles have specific permissions
    checkPermissions: async (roleIds, permissions) => {
        // Handle GUEST role
        if (roleIds.includes(SYSTEM_ROLES.GUEST.id)) {
            return permissions.reduce((acc, permission) => {
                acc[permission] = GUEST_PERMISSIONS.includes(permission);
                return acc;
            }, {});
        }

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
        // Handle GUEST role
        if (roleIds.includes(SYSTEM_ROLES.GUEST.id)) {
            return GUEST_PERMISSIONS.map((permission, index) => ({
                id: index,
                name: permission,
                resource: permission.split('_')[0]
            }));
        }

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
