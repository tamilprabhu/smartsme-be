const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Permission = sequelize.define(
    "Permission",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        resource: { type: DataTypes.STRING(100) },
        actionId: { type: DataTypes.INTEGER, field: 'action_id' },
        name: { type: DataTypes.STRING(150), unique: true },
        description: { type: DataTypes.TEXT },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "permissions",
        timestamps: false,
    }
);

module.exports = Permission;
