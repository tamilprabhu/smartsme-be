const ProductionShift = require('../models').ProductionShift;
const Product = require('../models').Product;
const { Op } = require('sequelize');

class ProductionShiftRepository {
    async getProductionSummary(companyId, startDate, endDate) {
        return await ProductionShift.findAll({
            where: {
                companyId,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{
                model: Product,
                attributes: ['productId', 'productName']
            }],
            attributes: [
                'productId',
                'production',
                'rejection', 
                'netProduction',
                'createdAt',
                'supervisor'
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async getProductionByProduct(companyId, startDate, endDate) {
        return await ProductionShift.findAll({
            where: {
                companyId,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{
                model: Product,
                attributes: ['productName']
            }],
            attributes: [
                'productId',
                [ProductionShift.sequelize.fn('SUM', ProductionShift.sequelize.col('production')), 'totalProduction'],
                [ProductionShift.sequelize.fn('SUM', ProductionShift.sequelize.col('rejection')), 'totalRejection'],
                [ProductionShift.sequelize.fn('SUM', ProductionShift.sequelize.col('netProduction')), 'totalNetProduction']
            ],
            group: ['productId', 'Product.productId'],
            order: [[ProductionShift.sequelize.fn('SUM', ProductionShift.sequelize.col('production')), 'DESC']]
        });
    }
}

module.exports = new ProductionShiftRepository();
