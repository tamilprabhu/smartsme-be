'use strict';

const Order = require('../models/order');

/**
 * SequelizeOrderRepository
 *
 * Minimal repository providing the findById() existence-check method
 * needed by production-shift use-cases. Only returns active, non-deleted records.
 */
class SequelizeOrderRepository {
    /**
     * @param {string} orderId
     * @param {string} companyId
     * @returns {Promise<object|null>} plain Sequelize instance or null
     */
    async findById(orderId, companyId) {
        const where = { orderId, isDeleted: false, isActive: true };
        if (companyId) where.companyId = companyId;
        return Order.findOne({ where, attributes: ['orderId'] });
    }
}

module.exports = new SequelizeOrderRepository();
