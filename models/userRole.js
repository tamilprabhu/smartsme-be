const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const UserRole = sequelize.define(
    "UserRole",
    {
        userId: { type: DataTypes.BIGINT, field: 'user_id', primaryKey: true },
        roleId: { type: DataTypes.BIGINT, field: 'role_id', primaryKey: true },
    },
    {
        tableName: "user_roles",
        timestamps: false,
    }
);

module.exports = UserRole;
