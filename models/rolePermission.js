const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RolePermission = sequelize.define(
    "RolePermission",
    {
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        permissionId: { type: DataTypes.INTEGER, field: 'permission_id', primaryKey: true },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: true, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: true, field: 'update_date' },
    },
    {
        tableName: "role_permissions",
        timestamps: false,
    }
);

module.exports = RolePermission;
