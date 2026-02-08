const { ProductionEntry } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const productionEntryService = {
    getAllProdEntries: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProductionEntryService: Fetching production entries - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = {
                companyId,
                ...(search && {
                    [Op.or]: [
                        { orderId: { [Op.like]: `%${search}%` } },
                        { shiftId: { [Op.like]: `%${search}%` } }
                    ]
                })
            };
            
            const { count, rows } = await ProductionEntry.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['shiftStartTime', 'DESC']]
            });
            logger.info(`ProductionEntryService: Successfully retrieved ${rows.length} production entries out of ${count} total for company ${companyId}`);
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
            logger.error("ProductionEntryService: Failed to fetch production entries", { 
                error: error.message, 
                companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    getProductionEntryById: async (orderId, companyId, shiftId, shiftStartTime) => {
        logger.info(`ProductionEntryService: Fetching production entry for company ${companyId}`);
        try {
            const productionEntry = await ProductionEntry.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (productionEntry) {
                logger.info(`ProductionEntryService: Successfully retrieved production entry for company ${companyId}`);
            } else {
                logger.warn(`ProductionEntryService: Production entry not found for company ${companyId}`);
            }
            return productionEntry;
        } catch (error) {
            logger.error(`ProductionEntryService: Failed to fetch production entry`, { 
                error: error.message, 
                companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    createProductionEntry: async (productionEntryData, companyId, userId) => {
        logger.info(`ProductionEntryService: Creating new production entry for order: ${productionEntryData.orderId}, company: ${companyId}, user: ${userId}`);
        try {
            const dataWithCompany = {
                ...productionEntryData,
                companyId
            };
            const productionEntry = await ProductionEntry.create(dataWithCompany);
            logger.info(`ProductionEntryService: Successfully created production entry for company ${companyId}`);
            return productionEntry;
        } catch (error) {
            logger.error(`ProductionEntryService: Failed to create production entry`, { 
                error: error.message, 
                companyId,
                userId,
                productionEntryData: productionEntryData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateProductionEntry: async (orderId, companyId, shiftId, shiftStartTime, productionEntryData, userId) => {
        logger.info(`ProductionEntryService: Updating production entry for company ${companyId}, user: ${userId}`, { updateData: productionEntryData });
        try {
            const [updatedRows] = await ProductionEntry.update(productionEntryData, {
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (updatedRows === 0) {
                logger.warn(`ProductionEntryService: No production entry found to update for company ${companyId}`);
                throw new Error("Production entry not found");
            }
            const updatedProductionEntry = await ProductionEntry.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            logger.info(`ProductionEntryService: Successfully updated production entry for company ${companyId}`);
            return updatedProductionEntry;
        } catch (error) {
            logger.error(`ProductionEntryService: Failed to update production entry`, { 
                error: error.message, 
                companyId,
                userId,
                updateData: productionEntryData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteProductionEntry: async (orderId, companyId, shiftId, shiftStartTime, userId) => {
        logger.info(`ProductionEntryService: Deleting production entry for company ${companyId}, user: ${userId}`);
        try {
            const [updatedRows] = await ProductionEntry.update(
                { isDeleted: true, isActive: false },
                { where: { orderId, companyId, shiftId, shiftStartTime, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`ProductionEntryService: No production entry found to delete for company ${companyId}`);
                throw new Error("Production entry not found");
            }
            logger.info(`ProductionEntryService: Successfully soft deleted production entry for company ${companyId}`);
            return { message: "Production entry deleted successfully" };
        } catch (error) {
            logger.error(`ProductionEntryService: Failed to delete production entry`, { 
                error: error.message, 
                companyId,
                userId,
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = productionEntryService;
