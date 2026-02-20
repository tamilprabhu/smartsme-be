const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Dispatch = sequelize.define(
    "Dispatch",
    {
        dispatchSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'dispatch_seq'
        },
        productId: { type: DataTypes.STRING(20), field: 'product_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        orderId: { type: DataTypes.STRING(20), field: 'order_id' },
        dispatchId: { type: DataTypes.STRING(20), allowNull: false, unique: true, field: 'dispatch_id' },
        dispatchDate: { type: DataTypes.DATE, field: 'dispatch_date' },
        quantity: { type: DataTypes.INTEGER },
        noOfPacks: { type: DataTypes.INTEGER, field: 'no_of_packs' },
        totalWeight: { type: DataTypes.DECIMAL(10, 4), field: 'total_weight' },
        normalWeight: { type: DataTypes.DECIMAL(10, 4), field: 'normal_weight' },
        normsWeight: { type: DataTypes.DECIMAL(10, 4), field: 'norms_weight' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "txn_dispatch",
        timestamps: false,
    }
);

module.exports = Dispatch;
