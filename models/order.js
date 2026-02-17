const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Order = sequelize.define(
    "Order",
    {
        orderSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'order_seq'
        },
        orderId: { type: DataTypes.STRING(20), field: 'order_id' },
        orderName: { type: DataTypes.STRING(50), field: 'order_name' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        productId: { type: DataTypes.STRING(20), field: 'product_id' },
        buyerId: { type: DataTypes.STRING(20), field: 'buyer_id' },
        orderStatus: { type: DataTypes.STRING(20), field: 'order_status' },
        orderDate: { type: DataTypes.DATE, field: 'order_date' },
        targetDate: { type: DataTypes.DATE, field: 'target_date' },
        orderQuantity: { type: DataTypes.INTEGER, field: 'order_quantity' },
        price: { type: DataTypes.DECIMAL(10, 2) },
        discount: { type: DataTypes.DECIMAL(10, 2) },
        totalPrice: { type: DataTypes.DECIMAL(10, 2), field: 'total_price' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "txn_order",
        timestamps: false,
    }
);

module.exports = Order;
