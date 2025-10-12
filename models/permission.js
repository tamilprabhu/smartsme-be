const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Permission = sequelize.define(
    "Permission",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        resource: { type: DataTypes.STRING(100) },
        actionId: { type: DataTypes.BIGINT, field: 'action_id' },
        name: { type: DataTypes.STRING(150), unique: true },
        description: { type: DataTypes.TEXT },
    },
    {
        tableName: "permissions",
        timestamps: false,
    }
);

module.exports = Permission;
