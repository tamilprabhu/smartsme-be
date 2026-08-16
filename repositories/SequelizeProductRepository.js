'use strict';

const Product = require('../models/product');

/**
 * SequelizeProductRepository
 *
 * Minimal repository providing the findById() existence-check method
 * needed by production-shift use-cases. Only returns active, non-deleted records.
 */
class SequelizeProductRepository {
    /**
     * @param {string} productId
     * @param {string} companyId
     * @returns {Promise<object|null>} plain Sequelize instance or null
     */
    async findById(productId, companyId) {
        const where = { productId, isDeleted: false, isActive: true };
        if (companyId) where.companyId = companyId;
        return Product.findOne({ where, attributes: ['productId', 'incentiveLimit'] });
    }
}

module.exports = new SequelizeProductRepository();
