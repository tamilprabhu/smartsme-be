const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Stock = sequelize.define(
    "Stock",
    {
        stockSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'stock_seq'
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        sellerId: { type: DataTypes.STRING(20), field: 'seller_id' },
        stockId: { type: DataTypes.STRING(20), field: 'stock_id' },
        stockDate: { type: DataTypes.DATE, field: 'stock_date' },
        rawMaterial: { type: DataTypes.STRING(20), field: 'raw_material' },
        noOfBars: { type: DataTypes.INTEGER, field: 'no_of_bars' },
        weight: { type: DataTypes.DECIMAL(10, 4) },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "stock",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = Stock;
