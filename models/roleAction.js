const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const RoleAction = sequelize.define(
    "RoleAction",
    {
        roleId: { type: DataTypes.BIGINT, field: 'role_id', primaryKey: true },
        actionId: { type: DataTypes.BIGINT, field: 'action_id', primaryKey: true },
    },
    {
        tableName: "role_actions",
        timestamps: false,
    }
);

module.exports = RoleAction;
