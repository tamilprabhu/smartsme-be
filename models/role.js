const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Role = sequelize.define(
    "Role",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING(100), unique: true },
        description: { type: DataTypes.TEXT },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

module.exports = Role;
