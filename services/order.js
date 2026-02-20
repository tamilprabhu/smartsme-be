const { Order } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { generateOrderId } = require("../utils/idGenerator");
const { validateCreate, validateUpdate } = require("../validators/order");

const MAX_RETRY_ATTEMPTS = 5;

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
                order: buildSortOrder(sortBy, sortOrder, 'order_seq', 'Order')
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
                    orderSequence: id,
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
        logger.info(`OrderService: Creating new order for company: ${companyId} by user: ${userId}`, {
            orderName: orderData.orderName,
            productId: orderData.productId,
            orderQuantity: orderData.orderQuantity,
            totalPrice: orderData.totalPrice
        });
        try {
            const validatedData = await validateCreate(orderData);
            const baseOrderData = {
                ...validatedData,
                companyId: companyId,
                createdBy: userId,
                updatedBy: userId
            };

            let order;
            let attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    const enrichedOrderData = {
                        ...baseOrderData,
                        orderId: generateOrderId()
                    };
                    order = await Order.create(enrichedOrderData);
                    break;
                } catch (error) {
                    const isUniqueError = error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "order_id" || e.path === "orderId");

                    if (isUniqueError) {
                        attempts++;
                        if (attempts >= MAX_RETRY_ATTEMPTS) {
                            throw new Error("Failed to generate unique order_id after maximum retries");
                        }
                        logger.warn(`OrderService: Duplicate order_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                    } else {
                        throw error;
                    }
                }
            }

            logger.info(`OrderService: Successfully created order: ${order.orderId} (ID: ${order.orderSequence}) for company: ${companyId}`, {
                orderId: order.orderSequence,
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
    updateOrder: async (id, orderData, companyId, userId) => {
        logger.info(`OrderService: Updating order with ID: ${id}`, { updateData: orderData, companyId, userId });
        try {
            const validatedData = await validateUpdate(orderData);
            const { orderId, ...safeOrderData } = validatedData;
            const enrichedOrderData = {
                ...safeOrderData,
                updatedBy: userId
            };

            const [updatedRows] = await Order.update(enrichedOrderData, {
                where: {
                    orderSequence: id,
                    companyId: companyId
                }
            });
            if (updatedRows === 0) {
                logger.warn(`OrderService: No order found to update with ID: ${id}`);
                throw new Error("Order not found");
            }
            const updatedOrder = await Order.findOne({
                where: {
                    orderSequence: id,
                    companyId: companyId
                }
            });
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
    deleteOrder: async (id, companyId) => {
        logger.info(`OrderService: Deleting order with ID: ${id} for company: ${companyId}`);
        try {
            const order = await Order.findOne({
                where: {
                    orderSequence: id,
                    companyId: companyId
                }
            });
            const [updatedRows] = await Order.update(
                { isDeleted: true, isActive: false },
                {
                    where: {
                        orderSequence: id,
                        companyId: companyId,
                        isDeleted: false
                    }
                }
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
