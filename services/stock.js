const { Stock } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const stockService = {
    getAllStocks: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`StockService: Fetching stocks - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            let whereClause = {};
            
            // Add company filter if provided
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            // Add search filter if provided
            if (search) {
                whereClause[Op.and] = [
                    ...(companyId ? [{ companyId }] : []),
                    {
                        [Op.or]: [
                            { stockId: { [Op.like]: `%${search}%` } },
                            { rawMaterial: { [Op.like]: `%${search}%` } },
                            { sellerId: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Stock.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['stockIdSeq', 'DESC']]
            });
            logger.info(`StockService: Successfully retrieved ${rows.length} stocks out of ${count} total for company: ${companyId}`);
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / validLimit),
                    itemsPerPage: validLimit,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error("StockService: Failed to fetch stocks", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getStockById: async (id) => {
        logger.info(`StockService: Fetching stock with ID: ${id}`);
        try {
            const stock = await Stock.findByPk(id);
            if (stock) {
                logger.info(`StockService: Successfully retrieved stock: ${stock.stockId} (ID: ${id})`);
            } else {
                logger.warn(`StockService: Stock not found with ID: ${id}`);
            }
            return stock;
        } catch (error) {
            logger.error(`StockService: Failed to fetch stock with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createStock: async (stockData) => {
        logger.info(`StockService: Creating new stock: ${stockData.stockId}`, { 
            rawMaterial: stockData.rawMaterial,
            weight: stockData.weight 
        });
        try {
            const stock = await Stock.create(stockData);
            logger.info(`StockService: Successfully created stock: ${stock.stockId} (ID: ${stock.stockIdSeq})`);
            return stock;
        } catch (error) {
            logger.error(`StockService: Failed to create stock: ${stockData.stockId}`, { 
                error: error.message, 
                stockData: stockData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateStock: async (id, stockData) => {
        logger.info(`StockService: Updating stock with ID: ${id}`, { updateData: stockData });
        try {
            const [updatedRows] = await Stock.update(stockData, {
                where: { stockIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`StockService: No stock found to update with ID: ${id}`);
                throw new Error("Stock not found");
            }
            const updatedStock = await Stock.findByPk(id);
            logger.info(`StockService: Successfully updated stock: ${updatedStock.stockId} (ID: ${id})`);
            return updatedStock;
        } catch (error) {
            logger.error(`StockService: Failed to update stock with ID: ${id}`, { 
                error: error.message, 
                updateData: stockData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteStock: async (id) => {
        logger.info(`StockService: Deleting stock with ID: ${id}`);
        try {
            const stock = await Stock.findByPk(id);
            const deletedRows = await Stock.destroy({
                where: { stockIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`StockService: No stock found to delete with ID: ${id}`);
                throw new Error("Stock not found");
            }
            logger.info(`StockService: Successfully deleted stock: ${stock?.stockId || 'Unknown'} (ID: ${id})`);
            return { message: "Stock deleted successfully" };
        } catch (error) {
            logger.error(`StockService: Failed to delete stock with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = stockService;
