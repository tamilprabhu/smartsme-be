const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const OrderQuantity = sequelize.define(
    "OrderQuantity",
    {
        orderId: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            field: 'order_id'
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        orderQuantity: { type: DataTypes.INTEGER, field: 'order_quantity' },
        productQuantity: { type: DataTypes.INTEGER, field: 'product_quantity' },
        fettlIpQuantity: { type: DataTypes.INTEGER, field: 'fettl_ip_quantity' },
        fettlAcQuantity: { type: DataTypes.INTEGER, field: 'fettl_ac_quantity' },
        fettlRjQuantity: { type: DataTypes.INTEGER, field: 'fettl_rj_quantity' },
        drillIpQuantity: { type: DataTypes.INTEGER, field: 'drill_ip_quantity' },
        drillAcQuantity: { type: DataTypes.INTEGER, field: 'drill_ac_quantity' },
        drillRjQuantity: { type: DataTypes.INTEGER, field: 'drill_rj_quantity' },
        tappIpQuantity: { type: DataTypes.INTEGER, field: 'tapp_ip_quantity' },
        tappAcQuantity: { type: DataTypes.INTEGER, field: 'tapp_ac_quantity' },
        tappRjQuantity: { type: DataTypes.INTEGER, field: 'tapp_rj_quantity' },
        machIpQuantity: { type: DataTypes.INTEGER, field: 'mach_ip_quantity' },
        machAcQuantity: { type: DataTypes.INTEGER, field: 'mach_ac_quantity' },
        machRjQuantity: { type: DataTypes.INTEGER, field: 'mach_rj_quantity' },
        trimIpQuantity: { type: DataTypes.INTEGER, field: 'trim_ip_quantity' },
        trimAcQuantity: { type: DataTypes.INTEGER, field: 'trim_ac_quantity' },
        trimRjQuantity: { type: DataTypes.INTEGER, field: 'trim_rj_quantity' },
        shotbIpQuantity: { type: DataTypes.INTEGER, field: 'shotb_ip_quantity' },
        shotbAcQuantity: { type: DataTypes.INTEGER, field: 'shotb_ac_quantity' },
        shotbRjQuantity: { type: DataTypes.INTEGER, field: 'shotb_rj_quantity' },
        pwdrIpQuantity: { type: DataTypes.INTEGER, field: 'pwdr_ip_quantity' },
        pwdrAcQuantity: { type: DataTypes.INTEGER, field: 'pwdr_ac_quantity' },
        pwdrRjQuantity: { type: DataTypes.INTEGER, field: 'pwdr_rj_quantity' },
        assmblIpQuantity: { type: DataTypes.INTEGER, field: 'assmbl_ip_quantity' },
        assmblAcQuantity: { type: DataTypes.INTEGER, field: 'assmbl_ac_quantity' },
        assmblRjQuantity: { type: DataTypes.INTEGER, field: 'assmbl_rj_quantity' },
        qlinsIpQuantity: { type: DataTypes.INTEGER, field: 'qlins_ip_quantity' },
        qlinsAcQuantity: { type: DataTypes.INTEGER, field: 'qlins_ac_quantity' },
        qlinsRjQuantity: { type: DataTypes.INTEGER, field: 'qlins_rj_quantity' },
        createDate: { type: DataTypes.DATE, allowNull: false, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: false, field: 'update_date' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "order_quantity",
        timestamps: false,
    }
);

module.exports = OrderQuantity;
