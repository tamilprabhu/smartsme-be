const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const UserRole = sequelize.define(
    "UserRole",
    {
        userId: { type: DataTypes.INTEGER, field: 'user_id', primaryKey: true },
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "user_roles",
        timestamps: false,
    }
);

module.exports = UserRole;
