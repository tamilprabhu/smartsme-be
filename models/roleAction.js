const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RoleAction = sequelize.define(
    "RoleAction",
    {
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        actionId: { type: DataTypes.INTEGER, field: 'action_id', primaryKey: true },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "role_actions",
        timestamps: false,
    }
);

module.exports = RoleAction;
