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
        createdBy: { type: DataTypes.INTEGER, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, field: 'updated_by' },
        metadata: { type: DataTypes.JSON, field: 'metadata' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "assets",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Asset;
