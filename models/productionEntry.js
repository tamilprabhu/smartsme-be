const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

// TODO: Investigate whether this model is required
const ProductionEntry = sequelize.define(
    "ProductionEntry",
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
    },
    {
        tableName: "production_entry",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = ProductionEntry;
