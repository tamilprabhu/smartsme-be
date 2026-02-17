const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Order = require("./order");
const Product = require("./product");
const Machine = require("./machine");

const hasValue = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    return true;
};

const ProductionShift = sequelize.define(
    "ProductionShift",
    {
        shiftSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'shift_seq'
        },
        orderId: {
            type: DataTypes.STRING(20),
            field: 'order_id',
            validate: {
                async validOrderId(value) {
                    if (value === null || value === undefined) return;
                    if (typeof value !== "string" || value.trim() === "") {
                        throw new Error("Invalid orderId");
                    }
                    const where = {
                        orderId: value,
                        isDeleted: false,
                        isActive: true,
                    };
                    if (hasValue(this.companyId)) where.companyId = this.companyId;
                    const order = await Order.findOne({ where, attributes: ["orderId"] });
                    if (!order) throw new Error("Invalid orderId");
                },
            },
        },
        companyId: { type: DataTypes.STRING(20), field: 'company_id' },
        shiftId: { type: DataTypes.STRING(20), field: 'shift_id' },
        productId: {
            type: DataTypes.STRING(20),
            field: 'product_id',
            allowNull: false,
            validate: {
                notNull: { msg: "Product is required" },
                async validProductId(value) {
                    if (!hasValue(value)) return;
                    const where = {
                        productId: value,
                        isDeleted: false,
                        isActive: true,
                    };
                    if (hasValue(this.companyId)) where.companyId = this.companyId;
                    const product = await Product.findOne({ where, attributes: ["productId"] });
                    if (!product) throw new Error("Invalid productId");
                },
            },
        },
        machineId: {
            type: DataTypes.STRING(20),
            field: 'machine_id',
            allowNull: false,
            validate: {
                notNull: { msg: "Machine is required" },
                async validMachineId(value) {
                    if (!hasValue(value)) return;
                    const where = {
                        machineId: value,
                        isDeleted: false,
                        isActive: true,
                    };
                    if (hasValue(this.companyId)) where.companyId = this.companyId;
                    const machine = await Machine.findOne({ where, attributes: ["machineId"] });
                    if (!machine) throw new Error("Invalid machineId");
                },
            },
        },
        shiftStartDate: { type: DataTypes.DATE, field: 'shift_start_date' },
        shiftEndDate: { type: DataTypes.DATE, field: 'shift_end_date' },
        entryType: { type: DataTypes.STRING(6), field: 'entry_type' },
        shiftType: { type: DataTypes.CHAR(1), field: 'shift_type' },
        shiftHours: { type: DataTypes.STRING(2), field: 'shift_hours' },
        operator1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "Operator 1 is required" },
            },
        },
        operator2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                distinctFromOperator1(value) {
                    if (value !== null && value !== undefined && this.operator1 === value) {
                        throw new Error("Operator 2 must be different from Operator 1");
                    }
                },
                distinctFromOperator3(value) {
                    if (value !== null && value !== undefined && this.operator3 === value) {
                        throw new Error("Operator 2 must be different from Operator 3");
                    }
                },
            },
        },
        operator3: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                distinctFromOperator1(value) {
                    if (value !== null && value !== undefined && this.operator1 === value) {
                        throw new Error("Operator 3 must be different from Operator 1");
                    }
                },
                distinctFromOperator2(value) {
                    if (value !== null && value !== undefined && this.operator2 === value) {
                        throw new Error("Operator 3 must be different from Operator 2");
                    }
                },
            },
        },
        supervisor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "Supervisor is required" },
            },
        },
        openingCount: { type: DataTypes.INTEGER, field: 'opening_count' },
        closingCount: { type: DataTypes.INTEGER, field: 'closing_count' },
        production: { type: DataTypes.INTEGER },
        rejection: { type: DataTypes.INTEGER },
        netProduction: { type: DataTypes.INTEGER, field: 'net_production' },
        incentive: { type: DataTypes.CHAR(1) },
        less80Reason: { type: DataTypes.STRING(50), field: 'less_80_reason' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
        createdBy: { type: DataTypes.INTEGER, allowNull: true, field: 'created_by' },
        updatedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'updated_by' },
    },
    {
        tableName: "txn_production_shift",
        timestamps: false,
    }
);

module.exports = ProductionShift;
