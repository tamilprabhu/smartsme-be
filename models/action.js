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
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "actions",
        timestamps: false,
    }
);

module.exports = Action;
