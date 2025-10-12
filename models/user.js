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
        firstName: { type: DataTypes.STRING(20), field: 'first_name' },
        lastName: { type: DataTypes.STRING(15), field: 'last_name' },
        name: { type: DataTypes.STRING(100) },
        email: { type: DataTypes.STRING(150), unique: true },
        mobile: { type: DataTypes.STRING(10), unique: true },
        address: { type: DataTypes.STRING(50) },
        password: { type: DataTypes.STRING(255) },
        createdDate: { type: DataTypes.DATE, field: 'created_date' },
        updatedDate: { type: DataTypes.DATE, field: 'updated_date' },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = User;
