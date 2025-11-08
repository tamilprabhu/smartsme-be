const { Order } = require("../models");
const logger = require("../config/logger");

const orderService = {
    // Get all orders
    getAllOrders: async () => {
        logger.info("OrderService: Fetching all orders");
        try {
            const orders = await Order.findAll();
            logger.info(`OrderService: Successfully retrieved ${orders.length} orders`);
            return orders;
        } catch (error) {
            logger.error("OrderService: Failed to fetch orders", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get order by ID
    getOrderById: async (id) => {
        logger.info(`OrderService: Fetching order with ID: ${id}`);
        try {
            const order = await Order.findByPk(id);
            if (order) {
                logger.info(`OrderService: Successfully retrieved order: ${order.orderId} (ID: ${id})`, {
                    orderStatus: order.orderStatus,
                    orderQuantity: order.orderQuantity,
                    totalPrice: order.totalPrice
                });
            } else {
                logger.warn(`OrderService: Order not found with ID: ${id}`);
            }
            return order;
        } catch (error) {
            logger.error(`OrderService: Failed to fetch order with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new order
    createOrder: async (orderData) => {
        logger.info(`OrderService: Creating new order: ${orderData.orderId}`, { 
            companyId: orderData.companyId,
            prodId: orderData.prodId,
            orderQuantity: orderData.orderQuantity,
            totalPrice: orderData.totalPrice
        });
        try {
            const order = await Order.create(orderData);
            logger.info(`OrderService: Successfully created order: ${order.orderId} (ID: ${order.orderIdSeq})`, {
                orderId: order.orderIdSeq,
                companyId: order.companyId,
                orderStatus: order.orderStatus,
                orderValue: order.totalPrice
            });
            return order;
        } catch (error) {
            logger.error(`OrderService: Failed to create order: ${orderData.orderId}`, { 
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
            const deletedRows = await Order.destroy({
                where: { orderIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`OrderService: No order found to delete with ID: ${id}`);
                throw new Error("Order not found");
            }
            logger.info(`OrderService: Successfully deleted order: ${order?.orderId || 'Unknown'} (ID: ${id})`);
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
