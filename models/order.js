const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Order = sequelize.define(
    "Order",
    {
        orderIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'order_id_seq'
        },
        orderId: { type: DataTypes.STRING(20), field: 'order_id' },
        orderName: { type: DataTypes.STRING(50), field: 'order_name' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        prodId: { type: DataTypes.STRING(20), field: 'prod_id' },
        buyerId: { type: DataTypes.STRING(20), field: 'buyer_id' },
        orderStatus: { type: DataTypes.STRING(20), field: 'order_status' },
        orderDate: { type: DataTypes.DATE, field: 'order_date' },
        targetDate: { type: DataTypes.DATE, field: 'target_date' },
        orderQuantity: { type: DataTypes.INTEGER, field: 'order_quantity' },
        price: { type: DataTypes.DECIMAL(10, 2) },
        discount: { type: DataTypes.DECIMAL(10, 2) },
        totalPrice: { type: DataTypes.DECIMAL(10, 2), field: 'total_price' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
    },
    {
        tableName: "order",
        timestamps: false,
    }
);

module.exports = Order;
