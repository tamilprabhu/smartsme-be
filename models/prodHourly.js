const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const ProdHourly = sequelize.define(
    "ProdHourly",
    {
        orderId: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            field: 'order_id'
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        shiftId: { type: DataTypes.STRING(20), field: 'shift_id' },
        shiftStartTime: { type: DataTypes.DATE, field: 'shift_start_time' },
        shiftEndTime: { type: DataTypes.DATE, field: 'shift_end_time' },
        openingCount: { type: DataTypes.INTEGER, field: 'opening_count' },
        closingCount: { type: DataTypes.INTEGER, field: 'closing_count' },
        production: { type: DataTypes.INTEGER },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: true, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: true, field: 'update_date' },
    },
    {
        tableName: "prod_hourly",
        timestamps: false,
    }
);

module.exports = ProdHourly;
