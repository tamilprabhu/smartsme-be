const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Company = sequelize.define(
    "Company",
    {
        companySequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'company_seq'
        },
        companyId: { type: DataTypes.STRING(12), field: 'company_id' },
        companyName: { type: DataTypes.STRING(100), allowNull: false, field: 'company_name' },
        businessCons: { type: DataTypes.STRING(20), allowNull: false, field: 'business_cons' },
        companyType: { type: DataTypes.STRING(20), allowNull: false, field: 'company_type' },
        address: { type: DataTypes.STRING(255) },
        pincode: { type: DataTypes.INTEGER },
        propName: { type: DataTypes.STRING(30), allowNull: false, field: 'prop_name' },
        directPhone: { type: DataTypes.STRING(10), field: 'direct_phone' },
        officePhone: { type: DataTypes.STRING(10), field: 'office_phone' },
        mgmtPhone: { type: DataTypes.STRING(10), field: 'mgmt_phone' },
        mailId: { type: DataTypes.STRING(50), field: 'mail_id' },
        natureOfBusiness: { type: DataTypes.STRING(20), field: 'nature_of_business' },
        authPerson: { type: DataTypes.STRING(30), field: 'auth_person' },
        mobileNo: { type: DataTypes.STRING(10), field: 'mobile_no' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "mst_company",
        timestamps: false,
    }
);

module.exports = Company;
