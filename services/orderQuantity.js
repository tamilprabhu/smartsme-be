const { OrderQuantity } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const orderQuantityService = {
    getAllOrderQuantities: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`OrderQuantityService: Fetching order quantities - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = {
                companyId,
                ...(search && {
                    [Op.or]: [
                        { orderId: { [Op.like]: `%${search}%` } }
                    ]
                })
            };
            
            const { count, rows } = await OrderQuantity.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['orderId', 'ASC']]
            });
            logger.info(`OrderQuantityService: Successfully retrieved ${rows.length} order quantities out of ${count} total`);
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
            logger.error("OrderQuantityService: Failed to fetch order quantities", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getOrderQuantityById: async (orderId, companyId) => {
        logger.info(`OrderQuantityService: Fetching order quantity with orderId: ${orderId}, companyId: ${companyId}`);
        try {
            const orderQuantity = await OrderQuantity.findOne({
                where: { orderId, companyId }
            });
            if (orderQuantity) {
                logger.info(`OrderQuantityService: Successfully retrieved order quantity`);
            } else {
                logger.warn(`OrderQuantityService: Order quantity not found`);
            }
            return orderQuantity;
        } catch (error) {
            logger.error(`OrderQuantityService: Failed to fetch order quantity`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createOrderQuantity: async (orderQuantityData, companyId, userId) => {
        logger.info(`OrderQuantityService: Creating new order quantity for order: ${orderQuantityData.orderId}, companyId: ${companyId}, userId: ${userId}`);
        try {
            const orderQuantity = await OrderQuantity.create({
                ...orderQuantityData,
                companyId,
                createUserId: userId,
                updateUserId: userId,
                createDate: new Date(),
                updateDate: new Date()
            });
            logger.info(`OrderQuantityService: Successfully created order quantity`);
            return orderQuantity;
        } catch (error) {
            logger.error(`OrderQuantityService: Failed to create order quantity`, { 
                error: error.message, 
                orderQuantityData: orderQuantityData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateOrderQuantity: async (orderId, companyId, orderQuantityData, userId) => {
        logger.info(`OrderQuantityService: Updating order quantity`, { updateData: orderQuantityData, companyId, userId });
        try {
            const [updatedRows] = await OrderQuantity.update({
                ...orderQuantityData,
                updateUserId: userId,
                updateDate: new Date()
            }, {
                where: { orderId, companyId }
            });
            if (updatedRows === 0) {
                logger.warn(`OrderQuantityService: No order quantity found to update`);
                throw new Error("Order quantity not found");
            }
            const updatedOrderQuantity = await OrderQuantity.findOne({
                where: { orderId, companyId }
            });
            logger.info(`OrderQuantityService: Successfully updated order quantity`);
            return updatedOrderQuantity;
        } catch (error) {
            logger.error(`OrderQuantityService: Failed to update order quantity`, { 
                error: error.message, 
                updateData: orderQuantityData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteOrderQuantity: async (orderId, companyId) => {
        logger.info(`OrderQuantityService: Deleting order quantity for orderId: ${orderId}, companyId: ${companyId}`);
        try {
            const deletedRows = await OrderQuantity.destroy({
                where: { orderId, companyId }
            });
            if (deletedRows === 0) {
                logger.warn(`OrderQuantityService: No order quantity found to delete`);
                throw new Error("Order quantity not found");
            }
            logger.info(`OrderQuantityService: Successfully deleted order quantity`);
            return { message: "Order quantity deleted successfully" };
        } catch (error) {
            logger.error(`OrderQuantityService: Failed to delete order quantity`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = orderQuantityService;
