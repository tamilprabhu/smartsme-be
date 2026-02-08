const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Product = sequelize.define(
    "Product",
    {
        prodIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'prod_id_seq'
        },
        prodId: { type: DataTypes.STRING(20), field: 'prod_id' },
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
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: true, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: true, field: 'update_date' },
    },
    {
        tableName: "product",
        timestamps: false,
    }
);

module.exports = Product;
