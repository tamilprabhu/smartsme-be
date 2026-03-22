const Product = require('../models').Product;
const { Op } = require('sequelize');

class ProductRepository {
    async searchProducts(companyId, searchCriteria = {}) {
        const where = {
            companyId,
            isActive: true,
            isDeleted: false
        };

        // Build dynamic search conditions
        if (searchCriteria.productName) {
            where.productName = {
                [Op.like]: `%${searchCriteria.productName}%`
            };
        }

        if (searchCriteria.rawMaterial) {
            where.rawMaterial = {
                [Op.like]: `%${searchCriteria.rawMaterial}%`
            };
        }

        if (searchCriteria.salesType) {
            where.salesType = searchCriteria.salesType;
        }

        if (searchCriteria.weightRange) {
            const { min, max } = searchCriteria.weightRange;
            where.weight = {};
            if (min !== undefined) where.weight[Op.gte] = min;
            if (max !== undefined) where.weight[Op.lte] = max;
        }

        return await Product.findAll({
            where,
            attributes: [
                'productId',
                'productName', 
                'rawMaterial',
                'weight',
                'salesType',
                'perItemRate',
                'cavity',
                'shotRate'
            ],
            order: [['productName', 'ASC']]
        });
    }

    async getProductById(companyId, productId) {
        return await Product.findOne({
            where: {
                companyId,
                productId,
                isActive: true,
                isDeleted: false
            }
        });
    }

    async getProductsByCategory(companyId, salesType) {
        return await Product.findAll({
            where: {
                companyId,
                salesType,
                isActive: true,
                isDeleted: false
            },
            order: [['productName', 'ASC']]
        });
    }
}

module.exports = new ProductRepository();
