'use strict';

/**
 * ProductionShift Sequelize Model
 *
 * Pure infrastructure concern — defines the ORM mapping between
 * the txn_production_shift table and JavaScript objects.
 *
 * Business invariants (operator distinctness, etc.) live in
 * domain/ProductionShiftEntity.js.
 *
 * Referential existence checks (valid product/machine/order) live in
 * application/use-cases/productionShift/CreateProductionShift.js and
 * UpdateProductionShift.js.
 *
 * No validate: hooks belong here.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const ProductionShift = sequelize.define(
    'ProductionShift',
    {
        shiftSequence: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'shift_seq',
        },
        companyId: {
            type: DataTypes.STRING(20),
            field: 'company_id',
        },
        shiftId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: 'shift_id',
        },
        orderId: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'order_id',
        },
        productId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'product_id',
        },
        machineId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'machine_id',
        },
        shiftStartDate: {
            type: DataTypes.DATE,
            field: 'shift_start_date',
        },
        shiftEndDate: {
            type: DataTypes.DATE,
            field: 'shift_end_date',
        },
        entryType: {
            type: DataTypes.STRING(6),
            field: 'entry_type',
        },
        shiftType: {
            type: DataTypes.CHAR(1),
            field: 'shift_type',
        },
        shiftHours: {
            type: DataTypes.STRING(2),
            field: 'shift_hours',
        },
        operator1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        operator2: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        operator3: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        supervisor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        openingCount: {
            type: DataTypes.INTEGER,
            field: 'opening_count',
        },
        closingCount: {
            type: DataTypes.INTEGER,
            field: 'closing_count',
        },
        production: {
            type: DataTypes.INTEGER,
        },
        rejection: {
            type: DataTypes.INTEGER,
        },
        netProduction: {
            type: DataTypes.INTEGER,
            field: 'net_production',
        },
        incentive: {
            type: DataTypes.CHAR(1),
        },
        less80Reason: {
            type: DataTypes.STRING(50),
            field: 'less_80_reason',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'create_date',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'update_date',
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: true,
            field: 'is_active',
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: false,
            field: 'is_deleted',
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'created_by',
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'updated_by',
        },
    },
    {
        tableName: 'txn_production_shift',
        timestamps: false,
    },
);

module.exports = ProductionShift;
