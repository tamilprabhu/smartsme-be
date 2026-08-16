'use strict';

const { Op, col, where, fn } = require('sequelize');
const ProductionShiftEntity = require('../domain/ProductionShiftEntity');
const { SortBy, SortOrder } = require('../constants/sort');
const { buildSortOrder } = require('../utils/sort');
const ItemsPerPage = require('../constants/pagination');
const logger = require('../config/logger');

/**
 * SequelizeProductionShiftRepository
 *
 * Infrastructure repository for ProductionShift (DDD — Infrastructure Layer).
 *
 * All Sequelize calls are contained here. The application layer (use-cases)
 * and domain layer (entity) have no knowledge of Sequelize.
 *
 * Public contract (what use-cases depend on):
 *   save(entity)                              → ProductionShiftEntity
 *   update(entity)                            → ProductionShiftEntity
 *   findBySequence(shiftSequence, companyId)  → ProductionShiftEntity | null
 *   findAll(opts)                             → { items, paging }
 *   softDelete(shiftSequence, companyId)      → boolean (true = found & deleted)
 */
class SequelizeProductionShiftRepository {
    /**
     * @param {object} deps
     * @param {import('../models/productionShift')} deps.ProductionShiftModel - the Sequelize model
     * @param {import('../models/product')}         deps.ProductModel
     * @param {import('../models/machine')}         deps.MachineModel
     * @param {import('../models/order')}           deps.OrderModel
     */
    constructor({ ProductionShiftModel, ProductModel, MachineModel, OrderModel }) {
        this.ProductionShift = ProductionShiftModel;
        this.Product = ProductModel;
        this.Machine = MachineModel;
        this.Order = OrderModel;
    }

    // ─── Private helpers ────────────────────────────────────────────────────

    /**
     * Map a Sequelize row to a domain entity.
     * @param {object} row - Sequelize model instance (dataValues accessible via getters)
     * @returns {ProductionShiftEntity}
     */
    _toEntity(row) {
        return new ProductionShiftEntity({
            shiftSequence: row.shiftSequence,
            shiftId: row.shiftId,
            companyId: row.companyId,
            productId: row.productId,
            machineId: row.machineId,
            orderId: row.orderId,
            shiftStartDate: row.shiftStartDate,
            shiftEndDate: row.shiftEndDate,
            entryType: row.entryType,
            shiftType: row.shiftType,
            shiftHours: row.shiftHours,
            operator1: row.operator1,
            operator2: row.operator2,
            operator3: row.operator3,
            supervisor: row.supervisor,
            openingCount: row.openingCount,
            closingCount: row.closingCount,
            production: row.production,
            rejection: row.rejection,
            netProduction: row.netProduction,
            incentive: row.incentive,
            less80Reason: row.less80Reason,
            isActive: row.isActive,
            isDeleted: row.isDeleted,
            createdBy: row.createdBy,
            updatedBy: row.updatedBy,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }

    // ─── Public contract ────────────────────────────────────────────────────

    /**
     * Persist a new (not-yet-persisted) entity.
     * @param {ProductionShiftEntity} entity
     * @returns {Promise<ProductionShiftEntity>} - entity with shiftSequence populated
     */
    async save(entity) {
        const plain = entity.toPlainObject();
        // Strip the PK — let the DB auto-increment assign it
        delete plain.shiftSequence;

        const row = await this.ProductionShift.create(plain);
        return this._toEntity(row);
    }

    /**
     * Persist changes to an existing entity.
     * Uses shiftSequence as the update key.
     * @param {ProductionShiftEntity} entity
     * @returns {Promise<ProductionShiftEntity>}
     */
    async update(entity) {
        const plain = entity.toPlainObject();
        // shiftId is immutable — never update it
        const { shiftSequence, shiftId, companyId, createdBy, createdAt, ...updateFields } = plain;

        await this.ProductionShift.update(updateFields, {
            where: { shiftSequence, companyId },
        });

        // Re-fetch to return a fresh entity reflecting DB state
        const row = await this.ProductionShift.findOne({
            where: { shiftSequence, companyId },
        });
        return this._toEntity(row);
    }

    /**
     * Find a single shift by its auto-increment PK within a company.
     * Returns null when not found or already soft-deleted.
     *
     * @param {number} shiftSequence
     * @param {string} companyId
     * @returns {Promise<ProductionShiftEntity|null>}
     */
    async findBySequence(shiftSequence, companyId) {
        const where = { shiftSequence, isDeleted: false };
        if (companyId) where.companyId = companyId;

        const row = await this.ProductionShift.findOne({ where });
        if (!row) return null;
        return this._toEntity(row);
    }

    /**
     * Find a single shift by its shiftSequence, including deleted records.
     * Used by the delete operation to confirm the record existed.
     *
     * @param {number} shiftSequence
     * @param {string} companyId
     * @returns {Promise<ProductionShiftEntity|null>}
     */
    async findBySequenceIncludeDeleted(shiftSequence, companyId) {
        const where = { shiftSequence };
        if (companyId) where.companyId = companyId;

        const row = await this.ProductionShift.findOne({ where });
        if (!row) return null;
        return this._toEntity(row);
    }

    /**
     * Paginated list with optional full-text search across relevant columns.
     *
     * @param {object} opts
     * @param {number} [opts.page=1]
     * @param {number} [opts.itemsPerPage=10]
     * @param {string} [opts.search='']
     * @param {string} [opts.companyId]
     * @param {string} [opts.sortBy]
     * @param {string} [opts.sortOrder]
     * @returns {Promise<{ items: ProductionShiftEntity[], paging: object }>}
     */
    async findAll({ page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId, sortBy = SortBy.SEQUENCE, sortOrder = SortOrder.DESC } = {}) {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        const offset = (page - 1) * validLimit;

        const whereClause = { isDeleted: false };
        if (companyId) whereClause.companyId = companyId;

        const include = [
            { model: this.Product, attributes: [], required: false },
            { model: this.Machine, attributes: [], required: false },
            { model: this.Order, attributes: [], required: false },
        ];

        const trimmedSearch = (search || '').trim();
        if (trimmedSearch) {
            const likeValue = `%${trimmedSearch.toLowerCase()}%`;
            whereClause[Op.or] = [
                where(fn('LOWER', col('ProductionShift.order_id')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('ProductionShift.shift_id')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('ProductionShift.product_id')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('ProductionShift.machine_id')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('ProductionShift.shift_type')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('Product.product_name')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('Machine.machine_name')), { [Op.like]: likeValue }),
                where(fn('LOWER', col('Order.order_name')), { [Op.like]: likeValue }),
            ];
        }

        const { count, rows } = await this.ProductionShift.findAndCountAll({
            where: whereClause,
            limit: validLimit,
            offset,
            order: buildSortOrder(sortBy, sortOrder, 'shift_seq', 'ProductionShift'),
            include,
        });

        return {
            items: rows.map((row) => this._toEntity(row)),
            paging: {
                currentPage: page,
                totalPages: Math.ceil(count / validLimit),
                itemsPerPage: validLimit,
                totalItems: count,
            },
        };
    }

    /**
     * Soft-delete a shift (set isDeleted=true, isActive=false).
     * Returns true if a row was affected, false if the shift wasn't found.
     *
     * @param {number} shiftSequence
     * @param {string} companyId
     * @returns {Promise<boolean>}
     */
    async softDelete(shiftSequence, companyId) {
        const where = { shiftSequence, isDeleted: false };
        if (companyId) where.companyId = companyId;

        const [updatedRows] = await this.ProductionShift.update(
            { isDeleted: true, isActive: false },
            { where },
        );
        return updatedRows > 0;
    }
}

/**
 * Lightweight "abstract" base to document the repository contract.
 * Not enforced at runtime — serves as documentation and enables
 * easy test doubles to extend this class.
 */
class ProductionShiftRepository {
    async save(entity) { throw new Error('Not implemented'); }
    async update(entity) { throw new Error('Not implemented'); }
    async findBySequence(shiftSequence, companyId) { throw new Error('Not implemented'); }
    async findAll(opts) { throw new Error('Not implemented'); }
    async softDelete(shiftSequence, companyId) { throw new Error('Not implemented'); }
}

module.exports = { SequelizeProductionShiftRepository, ProductionShiftRepository };
