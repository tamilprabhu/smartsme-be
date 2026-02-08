const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Stock = sequelize.define(
    "Stock",
    {
        stockIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'stock_id_seq'
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        sellerId: { type: DataTypes.STRING(20), field: 'seller_id' },
        stockId: { type: DataTypes.STRING(20), field: 'stock_id' },
        stockDate: { type: DataTypes.DATE, field: 'stock_date' },
        rawMaterial: { type: DataTypes.STRING(20), field: 'raw_material' },
        noOfBars: { type: DataTypes.INTEGER, field: 'no_of_bars' },
        weight: { type: DataTypes.DECIMAL(10, 4) },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "stock",
        timestamps: false,
    }
);

module.exports = Stock;
