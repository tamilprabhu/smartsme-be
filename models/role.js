const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Role = sequelize.define(
    "Role",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING(100), unique: true },
        description: { type: DataTypes.TEXT },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

module.exports = Role;
