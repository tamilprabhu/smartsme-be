const { ProdHourly } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const prodHourlyService = {
    getAllProdHourlies: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProdHourlyService: Fetching production hourlies - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { orderId: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } },
                    { shiftId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await ProdHourly.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['shiftStartTime', 'DESC']]
            });
            logger.info(`ProdHourlyService: Successfully retrieved ${rows.length} production hourlies out of ${count} total`);
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
            logger.error("ProdHourlyService: Failed to fetch production hourlies", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getProdHourlyById: async (orderId, companyId, shiftId, shiftStartTime) => {
        logger.info(`ProdHourlyService: Fetching production hourly`);
        try {
            const prodHourly = await ProdHourly.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (prodHourly) {
                logger.info(`ProdHourlyService: Successfully retrieved production hourly`);
            } else {
                logger.warn(`ProdHourlyService: Production hourly not found`);
            }
            return prodHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to fetch production hourly`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createProdHourly: async (prodHourlyData) => {
        logger.info(`ProdHourlyService: Creating new production hourly for order: ${prodHourlyData.orderId}`);
        try {
            const prodHourly = await ProdHourly.create(prodHourlyData);
            logger.info(`ProdHourlyService: Successfully created production hourly`);
            return prodHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to create production hourly`, { 
                error: error.message, 
                prodHourlyData: prodHourlyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateProdHourly: async (orderId, companyId, shiftId, shiftStartTime, prodHourlyData) => {
        logger.info(`ProdHourlyService: Updating production hourly`, { updateData: prodHourlyData });
        try {
            const [updatedRows] = await ProdHourly.update(prodHourlyData, {
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (updatedRows === 0) {
                logger.warn(`ProdHourlyService: No production hourly found to update`);
                throw new Error("Production hourly not found");
            }
            const updatedProdHourly = await ProdHourly.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            logger.info(`ProdHourlyService: Successfully updated production hourly`);
            return updatedProdHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to update production hourly`, { 
                error: error.message, 
                updateData: prodHourlyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteProdHourly: async (orderId, companyId, shiftId, shiftStartTime) => {
        logger.info(`ProdHourlyService: Deleting production hourly`);
        try {
            const deletedRows = await ProdHourly.destroy({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (deletedRows === 0) {
                logger.warn(`ProdHourlyService: No production hourly found to delete`);
                throw new Error("Production hourly not found");
            }
            logger.info(`ProdHourlyService: Successfully deleted production hourly`);
            return { message: "Production hourly deleted successfully" };
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to delete production hourly`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = prodHourlyService;
