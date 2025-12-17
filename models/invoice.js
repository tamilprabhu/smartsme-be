const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Invoice = sequelize.define(
    "Invoice",
    {
        invoiceSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'invoice_seq'
        },
        invoiceId: { type: DataTypes.STRING(20), field: 'invoice_id' },
        invoiceDate: { type: DataTypes.DATE, field: 'invoice_date' },
        compId: { type: DataTypes.STRING(20), field: 'comp_id' },
        buyrId: { type: DataTypes.STRING(10), field: 'buyr_id' },
        prodId: { type: DataTypes.STRING(10), field: 'prod_id' },
        quantity: { type: DataTypes.INTEGER },
        unitPrice: { type: DataTypes.DECIMAL(10, 2), field: 'unit_price' },
        cgstRate: { type: DataTypes.DECIMAL(10, 2), field: 'cgst_rate' },
        cgstAmount: { type: DataTypes.DECIMAL(10, 2), field: 'cgst_amount' },
        sgstRate: { type: DataTypes.DECIMAL(10, 2), field: 'sgst_rate' },
        sgstAmount: { type: DataTypes.DECIMAL(10, 2), field: 'sgst_amount' },
        totalAmount: { type: DataTypes.DECIMAL(10, 2), field: 'total_amount' },
        sacCode: { type: DataTypes.STRING(20), field: 'sac_code' },
        buyrGstin: { type: DataTypes.STRING(20), field: 'buyr_gstin' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
    },
    {
        tableName: "invoice",
        timestamps: false,
    }
);

module.exports = Invoice;
