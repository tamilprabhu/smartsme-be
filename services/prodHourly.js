const { ProdHourly } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const prodHourlyService = {
    getAllProdHourlies: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProdHourlyService: Fetching production hourlies - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
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
            
            const { count, rows } = await ProdHourly.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['shiftStartTime', 'DESC']]
            });
            logger.info(`ProdHourlyService: Successfully retrieved ${rows.length} production hourlies out of ${count} total for company ${companyId}`);
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
                companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    getProdHourlyById: async (orderId, companyId, shiftId, shiftStartTime) => {
        logger.info(`ProdHourlyService: Fetching production hourly for company ${companyId}`);
        try {
            const prodHourly = await ProdHourly.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (prodHourly) {
                logger.info(`ProdHourlyService: Successfully retrieved production hourly for company ${companyId}`);
            } else {
                logger.warn(`ProdHourlyService: Production hourly not found for company ${companyId}`);
            }
            return prodHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to fetch production hourly`, { 
                error: error.message, 
                companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    createProdHourly: async (prodHourlyData, companyId, userId) => {
        logger.info(`ProdHourlyService: Creating new production hourly for order: ${prodHourlyData.orderId}, company: ${companyId}, user: ${userId}`);
        try {
            const dataWithCompany = {
                ...prodHourlyData,
                companyId
            };
            const prodHourly = await ProdHourly.create(dataWithCompany);
            logger.info(`ProdHourlyService: Successfully created production hourly for company ${companyId}`);
            return prodHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to create production hourly`, { 
                error: error.message, 
                companyId,
                userId,
                prodHourlyData: prodHourlyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateProdHourly: async (orderId, companyId, shiftId, shiftStartTime, prodHourlyData, userId) => {
        logger.info(`ProdHourlyService: Updating production hourly for company ${companyId}, user: ${userId}`, { updateData: prodHourlyData });
        try {
            const [updatedRows] = await ProdHourly.update(prodHourlyData, {
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            if (updatedRows === 0) {
                logger.warn(`ProdHourlyService: No production hourly found to update for company ${companyId}`);
                throw new Error("Production hourly not found");
            }
            const updatedProdHourly = await ProdHourly.findOne({
                where: { orderId, companyId, shiftId, shiftStartTime }
            });
            logger.info(`ProdHourlyService: Successfully updated production hourly for company ${companyId}`);
            return updatedProdHourly;
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to update production hourly`, { 
                error: error.message, 
                companyId,
                userId,
                updateData: prodHourlyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteProdHourly: async (orderId, companyId, shiftId, shiftStartTime, userId) => {
        logger.info(`ProdHourlyService: Deleting production hourly for company ${companyId}, user: ${userId}`);
        try {
            const [updatedRows] = await ProdHourly.update(
                { isDeleted: true, isActive: false },
                { where: { orderId, companyId, shiftId, shiftStartTime, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`ProdHourlyService: No production hourly found to delete for company ${companyId}`);
                throw new Error("Production hourly not found");
            }
            logger.info(`ProdHourlyService: Successfully soft deleted production hourly for company ${companyId}`);
            return { message: "Production hourly deleted successfully" };
        } catch (error) {
            logger.error(`ProdHourlyService: Failed to delete production hourly`, { 
                error: error.message, 
                companyId,
                userId,
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = prodHourlyService;
