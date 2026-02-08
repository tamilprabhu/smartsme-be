const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Employee = sequelize.define(
    "Employee",
    {
        employeeIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'employee_id_seq'
        },
        userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        salary: { type: DataTypes.INTEGER },
        activeFlag: { type: DataTypes.CHAR(1), field: 'active_flag' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
        createDate: { type: DataTypes.DATE, allowNull: false, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: false, field: 'update_date' },
    },
    {
        tableName: "employee",
        timestamps: false,
    }
);

module.exports = Employee;
