const { Stock } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");

const stockService = {
    getAllStocks: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId = null,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
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
                order: buildSortOrder(sortBy, sortOrder, 'stock_seq')
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

    getStockById: async (id, companyId) => {
        logger.info(`StockService: Fetching stock with ID: ${id} for company: ${companyId}`);
        try {
            const whereClause = { stockSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const stock = await Stock.findOne({ where: whereClause });
            if (stock) {
                logger.info(`StockService: Successfully retrieved stock: ${stock.stockId} (ID: ${id}) for company: ${companyId}`);
            } else {
                logger.warn(`StockService: Stock not found with ID: ${id} for company: ${companyId}`);
            }
            return stock;
        } catch (error) {
            logger.error(`StockService: Failed to fetch stock with ID: ${id} for company: ${companyId}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createStock: async (stockData, companyId, userId) => {
        logger.info(`StockService: Creating new stock: ${stockData.stockId} for company: ${companyId}`, { 
            rawMaterial: stockData.rawMaterial,
            weight: stockData.weight 
        });
        try {
            const enrichedStockData = {
                ...stockData,
                companyId,
                createdBy: userId,
                updatedBy: userId
            };
            
            const stock = await Stock.create(enrichedStockData);
            logger.info(`StockService: Successfully created stock: ${stock.stockId} (ID: ${stock.stockSequence}) for company: ${companyId}`);
            return stock;
        } catch (error) {
            logger.error(`StockService: Failed to create stock: ${stockData.stockId} for company: ${companyId}`, { 
                error: error.message, 
                stockData: stockData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateStock: async (id, stockData, companyId, userId) => {
        logger.info(`StockService: Updating stock with ID: ${id} for company: ${companyId}`, { updateData: stockData });
        try {
            const enrichedStockData = {
                ...stockData,
                updatedBy: userId
            };
            
            const whereClause = { stockSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await Stock.update(enrichedStockData, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`StockService: No stock found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Stock not found");
            }
            const updatedStock = await Stock.findOne({ where: whereClause });
            logger.info(`StockService: Successfully updated stock: ${updatedStock.stockId} (ID: ${id}) for company: ${companyId}`);
            return updatedStock;
        } catch (error) {
            logger.error(`StockService: Failed to update stock with ID: ${id} for company: ${companyId}`, { 
                error: error.message, 
                updateData: stockData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteStock: async (id, companyId) => {
        logger.info(`StockService: Deleting stock with ID: ${id} for company: ${companyId}`);
        try {
            const whereClause = { stockSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const stock = await Stock.findOne({ where: whereClause });
            const [updatedRows] = await Stock.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`StockService: No stock found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Stock not found");
            }
            logger.info(`StockService: Successfully soft deleted stock: ${stock?.stockId || 'Unknown'} (ID: ${id}) for company: ${companyId}`);
            return { message: "Stock deleted successfully" };
        } catch (error) {
            logger.error(`StockService: Failed to delete stock with ID: ${id} for company: ${companyId}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = stockService;
