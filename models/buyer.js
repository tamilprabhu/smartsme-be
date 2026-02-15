const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Buyer = sequelize.define(
    "Buyer",
    {
        buyerSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'buyer_seq'
        },
        buyerId: { type: DataTypes.STRING(20), field: 'buyer_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        buyerName: { type: DataTypes.STRING(50), field: 'buyer_name' },
        buyerAddress: { type: DataTypes.STRING(100), field: 'buyer_address' },
        buyerPhone: { type: DataTypes.STRING(10), field: 'buyer_phone' },
        buyerEmail: { type: DataTypes.STRING(30), field: 'buyer_email' },
        buyerGstin: { type: DataTypes.STRING(20), field: 'buyer_gstin' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_buyer",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = Buyer;
