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
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_permissions",
        timestamps: false,
    }
);

module.exports = Permission;
