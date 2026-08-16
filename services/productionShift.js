'use strict';

/**
 * productionShiftService
 *
 * Application service — orchestrates the ProductionShift bounded context.
 *
 * Responsibilities:
 *   1. Referential existence checks (product / machine / order must exist)
 *   2. Construct / mutate the domain entity, which enforces business invariants
 *   3. Delegate persistence to the repository (infrastructure)
 *
 * Does NOT contain:
 *   - HTTP concerns (no req / res)
 *   - Joi validation (done in the route middleware before reaching here)
 *   - Direct Sequelize calls (all go through the repository)
 */

const logger = require('../config/logger');
const { generateShiftId } = require('../utils/idGenerator');

// ── Domain ────────────────────────────────────────────────────────────────────
const ProductionShiftEntity = require('../domain/ProductionShiftEntity');
const {
    ProductionShiftNotFoundError,
    InvalidProductError,
    InvalidMachineError,
    InvalidOrderError,
} = require('../domain/ProductionShiftErrors');

// ── Infrastructure ────────────────────────────────────────────────────────────
const { SequelizeProductionShiftRepository } = require('../repositories/SequelizeProductionShiftRepository');
const productRepository = require('../repositories/SequelizeProductRepository');
const machineRepository = require('../repositories/SequelizeMachineRepository');
const orderRepository   = require('../repositories/SequelizeOrderRepository');

// Load models through models/index.js so all associations are registered
const { ProductionShift, Product, Machine, Order } = require('../models');

const productionShiftRepository = new SequelizeProductionShiftRepository({
    ProductionShiftModel: ProductionShift,
    ProductModel:         Product,
    MachineModel:         Machine,
    OrderModel:           Order,
});

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_RETRY_ATTEMPTS = 5;

// ── Service ───────────────────────────────────────────────────────────────────

const productionShiftService = {

    /**
     * Paginated list of shifts for a company.
     */
    getAllProductionShifts: async (page, itemsPerPage, search, companyId, sortBy, sortOrder) => {
        logger.info('ProductionShiftService: getAllProductionShifts', {
            page, itemsPerPage, search, companyId,
        });
        return productionShiftRepository.findAll({
            page, itemsPerPage, search, companyId, sortBy, sortOrder,
        });
    },

    /**
     * Single shift by its auto-increment PK.
     * Returns the domain entity, or null if not found.
     */
    getProductionShiftById: async (shiftSequence, companyId) => {
        logger.info('ProductionShiftService: getProductionShiftById', { shiftSequence, companyId });
        return productionShiftRepository.findBySequence(shiftSequence, companyId);
    },

    /**
     * Create a new production shift.
     *
     * Flow:
     *   1. Check product / machine / order exist (application-layer concern)
     *   2. Construct domain entity — enforces operator-distinctness invariant
     *   3. Persist with shiftId uniqueness retry
     *
     * @param {object} shiftData   - validated payload from Joi
     * @param {string} companyId
     * @param {number} userId
     * @returns {Promise<ProductionShiftEntity>}
     */
    createProductionShift: async (shiftData, companyId, userId) => {
        logger.info('ProductionShiftService: createProductionShift', { companyId, userId });

        const { productId, machineId, orderId } = shiftData;

        // ── Referential existence checks ──────────────────────────────────────
        const product = await productRepository.findById(productId, companyId);
        if (!product) throw new InvalidProductError(productId);

        const machine = await machineRepository.findById(machineId, companyId);
        if (!machine) throw new InvalidMachineError(machineId);

        if (orderId) {
            const order = await orderRepository.findById(orderId, companyId);
            if (!order) throw new InvalidOrderError(orderId);
        }

        // ── Build domain entity (invariants asserted on construction) ─────────
        const now = new Date();
        const entity = new ProductionShiftEntity({
            ...shiftData,
            companyId,
            createdBy:  userId,
            updatedBy:  userId,
            createdAt:  now,
            updatedAt:  now,
        });

        // ── Persist with unique shiftId retry ─────────────────────────────────
        let attempts = 0;
        while (attempts < MAX_RETRY_ATTEMPTS) {
            entity.shiftId = generateShiftId();
            try {
                return await productionShiftRepository.save(entity);
            } catch (err) {
                const isShiftIdCollision =
                    err.name === 'SequelizeUniqueConstraintError' &&
                    err.errors?.some((e) => e.path === 'shift_id' || e.path === 'shiftId');

                if (isShiftIdCollision && ++attempts < MAX_RETRY_ATTEMPTS) {
                    logger.warn('ProductionShiftService: shiftId collision, retrying', {
                        attempt: attempts,
                    });
                } else {
                    throw isShiftIdCollision
                        ? new Error('Failed to generate a unique shift ID after maximum retries')
                        : err;
                }
            }
        }
    },

    /**
     * Update an existing shift.
     *
     * Flow:
     *   1. Load entity — throws ProductionShiftNotFoundError if missing
     *   2. Re-check referential integrity only for changed fields
     *   3. Delegate mutation to entity.applyUpdate() — re-asserts invariants
     *   4. Persist
     *
     * @param {number} shiftSequence
     * @param {object} shiftData     - validated partial payload from Joi
     * @param {string} companyId
     * @param {number} userId
     * @returns {Promise<ProductionShiftEntity>}
     */
    updateProductionShift: async (shiftSequence, shiftData, companyId, userId) => {
        logger.info('ProductionShiftService: updateProductionShift', { shiftSequence, companyId, userId });

        // ── Load existing entity ───────────────────────────────────────────────
        const entity = await productionShiftRepository.findBySequence(shiftSequence, companyId);
        if (!entity) throw new ProductionShiftNotFoundError(shiftSequence);

        // ── Referential checks — only for fields being changed ─────────────────
        let incentiveLimit = null;

        if (shiftData.productId !== undefined) {
            const product = await productRepository.findById(shiftData.productId, companyId);
            if (!product) throw new InvalidProductError(shiftData.productId);
            incentiveLimit = product.incentiveLimit;
        }

        if (shiftData.machineId !== undefined) {
            const machine = await machineRepository.findById(shiftData.machineId, companyId);
            if (!machine) throw new InvalidMachineError(shiftData.machineId);
        }

        if (shiftData.orderId !== undefined && shiftData.orderId !== null && shiftData.orderId !== '') {
            const order = await orderRepository.findById(shiftData.orderId, companyId);
            if (!order) throw new InvalidOrderError(shiftData.orderId);
        }

        // If production counts are being updated but productId is not changing,
        // fetch the current product's incentiveLimit to validate against.
        const isUpdatingCounts = ['openingCount', 'closingCount', 'rejection', 'netProduction']
            .some((f) => shiftData[f] !== undefined);

        if (isUpdatingCounts && incentiveLimit === null) {
            const currentProductId = shiftData.productId ?? entity.productId;
            const product = await productRepository.findById(currentProductId, companyId);
            if (product) incentiveLimit = product.incentiveLimit;
        }

        // ── Mutate via domain entity (re-asserts all invariants) ──────────────
        entity.applyUpdate(shiftData, userId, incentiveLimit);

        // ── Persist ────────────────────────────────────────────────────────────
        return productionShiftRepository.update(entity);
    },

    // Records production counts on an existing shift.
    // Derives production, netProduction and incentive via the domain entity.
    // incentiveLimit is fetched from the product (cross-aggregate lookup).
    recordProductionShift: async (shiftSequence, counts, companyId, userId) => {
        logger.info('ProductionShiftService: recordProductionShift', { shiftSequence, companyId, userId });

        const entity = await productionShiftRepository.findBySequence(shiftSequence, companyId);
        if (!entity) throw new ProductionShiftNotFoundError(shiftSequence);

        const product = await productRepository.findById(entity.productId, companyId);
        if (!product) throw new InvalidProductError(entity.productId);

        entity.recordProduction(counts, product.incentiveLimit);
        entity.updatedBy = userId;
        entity.updatedAt = new Date();

        return productionShiftRepository.update(entity);
    },

    deleteProductionShift: async (shiftSequence, companyId) => {
        logger.info('ProductionShiftService: deleteProductionShift', { shiftSequence, companyId });

        const deleted = await productionShiftRepository.softDelete(shiftSequence, companyId);
        if (!deleted) throw new ProductionShiftNotFoundError(shiftSequence);

        return { message: 'Production shift deleted successfully' };
    },
};

module.exports = productionShiftService;
