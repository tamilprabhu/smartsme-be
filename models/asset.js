const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Asset = sequelize.define(
    "Asset",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        module: { type: DataTypes.STRING(50), allowNull: false },
        subModule: { type: DataTypes.STRING(50), allowNull: false, field: 'sub_module' },
        identifier: { type: DataTypes.STRING(100), allowNull: false },
        originalName: { type: DataTypes.STRING(255), allowNull: false, field: 'original_name' },
        storedName: { type: DataTypes.STRING(255), allowNull: false, field: 'stored_name' },
        mimeType: { type: DataTypes.STRING(100), allowNull: false, field: 'mime_type' },
        sizeBytes: { type: DataTypes.INTEGER, allowNull: false, field: 'size_bytes' },
        storagePath: { type: DataTypes.STRING(500), allowNull: false, field: 'storage_path' },
        visibility: { type: DataTypes.ENUM('public', 'private'), allowNull: false, defaultValue: 'private' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        metadata: { type: DataTypes.JSON, field: 'metadata' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_assets",
        timestamps: true,
        createdAt: "create_date",
        updatedAt: "update_date",
    }
);

module.exports = Asset;
