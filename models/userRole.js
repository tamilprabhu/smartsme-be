const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const UserRole = sequelize.define(
    "UserRole",
    {
        userId: { type: DataTypes.INTEGER, field: 'user_id', primaryKey: true },
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "map_user_role",
        timestamps: false,
    }
);

module.exports = UserRole;
