const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Seller = sequelize.define(
    "Seller",
    {
        sellerSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'seller_seq'
        },
        sellerId: { type: DataTypes.STRING(20), field: 'seller_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        sellerName: { type: DataTypes.STRING(50), field: 'seller_name' },
        sellerAddress: { type: DataTypes.STRING(100), field: 'seller_address' },
        sellerPhone: { type: DataTypes.STRING(10), field: 'seller_phone' },
        sellerEmail: { type: DataTypes.STRING(30), field: 'seller_email' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "seller",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = Seller;
