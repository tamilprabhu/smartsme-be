const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Buyer = sequelize.define(
    "Buyer",
    {
        buyerIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'buyer_id_seq'
        },
        buyerId: { type: DataTypes.STRING(20), field: 'buyer_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        buyerName: { type: DataTypes.STRING(50), field: 'buyer_name' },
        buyerAddress: { type: DataTypes.STRING(100), field: 'buyer_address' },
        buyerPhone: { type: DataTypes.STRING(10), field: 'buyer_phone' },
        buyerEmail: { type: DataTypes.STRING(30), field: 'buyer_email' },
        buyerGstin: { type: DataTypes.STRING(20), field: 'buyer_gstin' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
    },
    {
        tableName: "buyer",
        timestamps: false,
    }
);

module.exports = Buyer;
