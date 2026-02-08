const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Seller = sequelize.define(
    "Seller",
    {
        sellerIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'seller_id_seq'
        },
        sellerId: { type: DataTypes.STRING(20), field: 'seller_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        sellerName: { type: DataTypes.STRING(50), field: 'seller_name' },
        sellerAddress: { type: DataTypes.STRING(100), field: 'seller_address' },
        sellerPhone: { type: DataTypes.STRING(10), field: 'seller_phone' },
        sellerEmail: { type: DataTypes.STRING(30), field: 'seller_email' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "seller",
        timestamps: false,
    }
);

module.exports = Seller;
