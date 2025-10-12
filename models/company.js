const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Company = sequelize.define(
    "Company",
    {
        companyIdSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'company_id_seq'
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
        createDate: { type: DataTypes.DATE, allowNull: false, field: 'create_date' },
        updateDate: { type: DataTypes.DATE, allowNull: false, field: 'update_date' },
    },
    {
        tableName: "company",
        timestamps: false,
    }
);

module.exports = Company;
