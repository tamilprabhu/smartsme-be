const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RoleAction = sequelize.define(
    "RoleAction",
    {
        roleId: { type: DataTypes.INTEGER, field: 'role_id', primaryKey: true },
        actionId: { type: DataTypes.INTEGER, field: 'action_id', primaryKey: true },
    },
    {
        tableName: "role_actions",
        timestamps: false,
    }
);

module.exports = RoleAction;
