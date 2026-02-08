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
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: true, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: true, field: 'update_date' },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

module.exports = Role;
