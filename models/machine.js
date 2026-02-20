const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Machine = sequelize.define(
    "Machine",
    {
        machineSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'machine_seq'
        },
        machineId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: 'machine_id'
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        machineName: { type: DataTypes.STRING(50), field: 'machine_name' },
        machineType: { type: DataTypes.STRING(20), field: 'machine_type' },
        capacity: { type: DataTypes.STRING(10) },
        model: { type: DataTypes.STRING(20) },
        activeFlag: { type: DataTypes.CHAR(1), field: 'active_flag' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_machine",
        timestamps: false,
    }
);

module.exports = Machine;
