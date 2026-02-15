const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
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
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_users",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = User;
