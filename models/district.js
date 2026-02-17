const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const District = sequelize.define(
    "District",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stateId: { type: DataTypes.INTEGER, allowNull: false, field: 'state_id' },
        districtName: { type: DataTypes.STRING(100), allowNull: false, field: 'district_name' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
    },
    {
        tableName: "ref_districts",
        timestamps: false,
    }
);

module.exports = District;
