const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Product = sequelize.define(
    "Product",
    {
        prodSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'prod_seq'
        },
        productId: { type: DataTypes.STRING(20), field: 'product_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        prodName: { type: DataTypes.STRING(50), field: 'prod_name' },
        rawMaterial: { type: DataTypes.STRING(20), field: 'raw_material' },
        weight: { type: DataTypes.DECIMAL(10, 4) },
        wastage: { type: DataTypes.INTEGER },
        norms: { type: DataTypes.DECIMAL(10, 4) },
        totalWeight: { type: DataTypes.DECIMAL(10, 4), field: 'total_weight' },
        cavity: { type: DataTypes.INTEGER },
        shotRate: { type: DataTypes.DECIMAL(10, 2), field: 'shot_rate' },
        perItemRate: { type: DataTypes.DECIMAL(10, 2), field: 'per_item_rate' },
        incentiveLimit: { type: DataTypes.INTEGER, field: 'incentive_limit' },
        salesType: { type: DataTypes.STRING(20), field: 'sales_type' },
        salesCode: { type: DataTypes.STRING(20), field: 'sales_code' },
        salesPercent: { type: DataTypes.DECIMAL(10, 2), field: 'sales_percent' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_product",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = Product;
