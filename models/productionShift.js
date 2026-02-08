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
        prodName: { type: DataTypes.STRING(50), field: 'prod_name' },
        machineId: { type: DataTypes.STRING(20), field: 'machine_id' },
        shiftStartDate: { type: DataTypes.DATE, field: 'shift_start_date' },
        shiftEndDate: { type: DataTypes.DATE, field: 'shift_end_date' },
        entryType: { type: DataTypes.STRING(6), field: 'entry_type' },
        shiftType: { type: DataTypes.CHAR(1), field: 'shift_type' },
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
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "prod_shift",
        timestamps: false,
    }
);

module.exports = ProductionShift;
