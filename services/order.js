const { Order } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");

const orderService = {
    // Get all orders with pagination and search
    getAllOrders: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`OrderService: Fetching orders - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = {
                companyId: companyId,
                ...(search && {
                    [Op.or]: [
                        { orderId: { [Op.like]: `%${search}%` } },
                        { orderName: { [Op.like]: `%${search}%` } },
                        { orderStatus: { [Op.like]: `%${search}%` } }
                    ]
                })
            };
            
            const { count, rows } = await Order.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'order_id_seq')
            });
            logger.info(`OrderService: Successfully retrieved ${rows.length} orders out of ${count} total for company ${companyId}`);
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
            logger.error("OrderService: Failed to fetch orders", { 
                error: error.message, 
                companyId: companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get order by ID
    getOrderById: async (id, companyId) => {
        logger.info(`OrderService: Fetching order with ID: ${id} for company: ${companyId}`);
        try {
            const order = await Order.findOne({
                where: {
                    orderIdSeq: id,
                    companyId: companyId
                }
            });
            if (order) {
                logger.info(`OrderService: Successfully retrieved order: ${order.orderId} (ID: ${id}) for company: ${companyId}`, {
                    orderStatus: order.orderStatus,
                    orderQuantity: order.orderQuantity,
                    totalPrice: order.totalPrice
                });
            } else {
                logger.warn(`OrderService: Order not found with ID: ${id} for company: ${companyId}`);
            }
            return order;
        } catch (error) {
            logger.error(`OrderService: Failed to fetch order with ID: ${id} for company: ${companyId}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new order
    createOrder: async (orderData, companyId, userId) => {
        logger.info(`OrderService: Creating new order: ${orderData.orderId} for company: ${companyId} by user: ${userId}`, { 
            prodId: orderData.prodId,
            orderQuantity: orderData.orderQuantity,
            totalPrice: orderData.totalPrice
        });
        try {
            const enrichedOrderData = {
                ...orderData,
                companyId: companyId,
                createdBy: userId,
                updatedBy: userId
            };
            
            const order = await Order.create(enrichedOrderData);
            logger.info(`OrderService: Successfully created order: ${order.orderId} (ID: ${order.orderIdSeq}) for company: ${companyId}`, {
                orderId: order.orderIdSeq,
                companyId: order.companyId,
                orderStatus: order.orderStatus,
                orderValue: order.totalPrice,
                createdBy: order.createdBy
            });
            return order;
        } catch (error) {
            logger.error(`OrderService: Failed to create order: ${orderData.orderId} for company: ${companyId}`, { 
                error: error.message, 
                orderData: orderData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Update order
    updateOrder: async (id, orderData) => {
        logger.info(`OrderService: Updating order with ID: ${id}`, { updateData: orderData });
        try {
            const [updatedRows] = await Order.update(orderData, {
                where: { orderIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`OrderService: No order found to update with ID: ${id}`);
                throw new Error("Order not found");
            }
            const updatedOrder = await Order.findByPk(id);
            logger.info(`OrderService: Successfully updated order: ${updatedOrder.orderId} (ID: ${id})`, {
                orderStatus: updatedOrder.orderStatus
            });
            return updatedOrder;
        } catch (error) {
            logger.error(`OrderService: Failed to update order with ID: ${id}`, { 
                error: error.message, 
                updateData: orderData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Delete order
    deleteOrder: async (id) => {
        logger.info(`OrderService: Deleting order with ID: ${id}`);
        try {
            const order = await Order.findByPk(id);
            const [updatedRows] = await Order.update(
                { isDeleted: true, isActive: false },
                { where: { orderIdSeq: id, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`OrderService: No order found to delete with ID: ${id}`);
                throw new Error("Order not found");
            }
            logger.info(`OrderService: Successfully soft deleted order: ${order?.orderId || 'Unknown'} (ID: ${id})`);
            return { message: "Order deleted successfully" };
        } catch (error) {
            logger.error(`OrderService: Failed to delete order with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = orderService;
