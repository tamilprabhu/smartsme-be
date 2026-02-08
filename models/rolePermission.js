const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RolePermission = sequelize.define(
    "RolePermission",
    {
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        permissionId: { type: DataTypes.INTEGER, field: 'permission_id', primaryKey: true },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "role_permissions",
        timestamps: false,
    }
);

module.exports = RolePermission;
