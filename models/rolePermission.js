const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RolePermission = sequelize.define(
    "RolePermission",
    {
        roleId: { type: DataTypes.BIGINT, field: 'role_id', primaryKey: true },
        permissionId: { type: DataTypes.BIGINT, field: 'permission_id', primaryKey: true },
    },
    {
        tableName: "role_permissions",
        timestamps: false,
    }
);

module.exports = RolePermission;
