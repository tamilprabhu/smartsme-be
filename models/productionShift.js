const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const ProductionShift = sequelize.define(
    "ProductionShift",
    {
        shiftIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'shift_id_seq'
        },
        orderId: { type: DataTypes.STRING(20), field: 'order_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        shiftId: { type: DataTypes.STRING(20), field: 'shift_id' },
        productId: { type: DataTypes.STRING(20), field: 'product_id' },
        machineId: { type: DataTypes.STRING(20), field: 'machine_id' },
        shiftStartDate: { type: DataTypes.DATE, field: 'shift_start_date' },
        shiftEndDate: { type: DataTypes.DATE, field: 'shift_end_date' },
        entryType: { type: DataTypes.STRING(6), field: 'entry_type' },
        shiftType: { type: DataTypes.CHAR(1), field: 'shift_type' },
        shiftHours: { type: DataTypes.STRING(2), field: 'shift_hours' },
        operator1: { type: DataTypes.INTEGER },
        operator2: { type: DataTypes.INTEGER },
        operator3: { type: DataTypes.INTEGER },
        supervisor: { type: DataTypes.INTEGER },
        openingCount: { type: DataTypes.INTEGER, field: 'opening_count' },
        closingCount: { type: DataTypes.INTEGER, field: 'closing_count' },
        production: { type: DataTypes.INTEGER },
        rejection: { type: DataTypes.INTEGER },
        netProduction: { type: DataTypes.INTEGER, field: 'net_production' },
        incentive: { type: DataTypes.CHAR(1) },
        less80Reason: { type: DataTypes.STRING(50), field: 'less_80_reason' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "production_shift",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = ProductionShift;
