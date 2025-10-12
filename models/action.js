const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Action = sequelize.define(
    "Action",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING(50), unique: true },
        description: { type: DataTypes.TEXT },
    },
    {
        tableName: "actions",
        timestamps: false,
    }
);

module.exports = Action;
