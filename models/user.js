const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        username: { type: DataTypes.STRING(50), unique: true },
        name: { type: DataTypes.STRING(100) },
        email: { type: DataTypes.STRING(150), unique: true },
        mobile: { type: DataTypes.STRING(10), unique: true },
        password: { type: DataTypes.STRING(255) },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = User;
