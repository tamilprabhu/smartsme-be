const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const UserRole = sequelize.define(
    "UserRole",
    {
        userId: { type: DataTypes.INTEGER, field: 'user_id', primaryKey: true },
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: true, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: true, field: 'update_date' },
    },
    {
        tableName: "user_roles",
        timestamps: false,
    }
);

module.exports = UserRole;
