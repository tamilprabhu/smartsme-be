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
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        buyerId: { type: DataTypes.STRING(10), field: 'buyer_id' },
        productId: { type: DataTypes.STRING(10), field: 'product_id' },
        quantity: { type: DataTypes.INTEGER },
        unitPrice: { type: DataTypes.DECIMAL(10, 2), field: 'unit_price' },
        cgstRate: { type: DataTypes.DECIMAL(10, 2), field: 'cgst_rate' },
        cgstAmount: { type: DataTypes.DECIMAL(10, 2), field: 'cgst_amount' },
        sgstRate: { type: DataTypes.DECIMAL(10, 2), field: 'sgst_rate' },
        sgstAmount: { type: DataTypes.DECIMAL(10, 2), field: 'sgst_amount' },
        totalAmount: { type: DataTypes.DECIMAL(10, 2), field: 'total_amount' },
        sacCode: { type: DataTypes.STRING(20), field: 'sac_code' },
        buyrGstin: { type: DataTypes.STRING(20), field: 'buyr_gstin' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "txn_invoice",
        timestamps: false,
    }
);

module.exports = Invoice;
