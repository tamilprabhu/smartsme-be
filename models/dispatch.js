const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Dispatch = sequelize.define(
    "Dispatch",
    {
        dispatchIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'dispatch_id_seq'
        },
        prodId: { type: DataTypes.STRING(20), field: 'prod_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        orderId: { type: DataTypes.STRING(20), field: 'order_id' },
        dispatchId: { type: DataTypes.STRING(20), field: 'dispatch_id' },
        dispatchDate: { type: DataTypes.DATE, field: 'dispatch_date' },
        quantity: { type: DataTypes.INTEGER },
        noOfPacks: { type: DataTypes.INTEGER, field: 'no_of_packs' },
        totalWeight: { type: DataTypes.DECIMAL(10, 4), field: 'total_weight' },
        normalWeight: { type: DataTypes.DECIMAL(10, 4), field: 'normal_weight' },
        normsWeight: { type: DataTypes.DECIMAL(10, 4), field: 'norms_weight' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
    },
    {
        tableName: "dispatch",
        timestamps: false,
    }
);

module.exports = Dispatch;
