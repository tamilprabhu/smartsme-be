const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Machine = sequelize.define(
    "Machine",
    {
        machineIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'machine_id_seq'
        },
        machineId: { type: DataTypes.STRING(20), field: 'machine_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        machineName: { type: DataTypes.STRING(50), field: 'machine_name' },
        machineType: { type: DataTypes.STRING(20), field: 'machine_type' },
        capacity: { type: DataTypes.STRING(10) },
        model: { type: DataTypes.STRING(20) },
        activeFlag: { type: DataTypes.CHAR(1), field: 'active_flag' },
        createDate: { type: DataTypes.DATE, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, field: 'update_date' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    {
        tableName: "machine",
        timestamps: false,
    }
);

module.exports = Machine;
