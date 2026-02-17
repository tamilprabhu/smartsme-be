const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Pincode = sequelize.define(
    "Pincode",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postOfficeName: { type: DataTypes.STRING(200), allowNull: false, field: 'post_office_name' },
        pincode: { type: DataTypes.STRING(10), allowNull: false },
        stateName: { type: DataTypes.STRING(100), allowNull: false, field: 'state_name' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
    },
    {
        tableName: "ref_pincodes",
        timestamps: false,
    }
);

module.exports = Pincode;
