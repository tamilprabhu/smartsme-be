const express = require("express");
const router = express.Router();
const orderService = require("../services/order");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");

// GET /orders - Get all orders with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    
    logger.info(`OrderRoute: GET /orders - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.auth?.id
    });
    
    try {
        const result = await orderService.getAllOrders(page, itemsPerPage, search);
        logger.info(`OrderRoute: GET /orders - Request completed successfully`, { 
            requestId: requestId,
            orderCount: result.items.length,
            totalCount: result.paging.totalItems,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (error) {
        logger.error(`OrderRoute: GET /orders - Request failed`, { 
            requestId: requestId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /orders/:id - Get order by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    
    logger.info(`OrderRoute: GET /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        userId: req.auth?.id
    });
    
    try {
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            logger.warn(`OrderRoute: GET /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: "Order not found" });
        }
        
        logger.info(`OrderRoute: GET /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            orderName: order.orderId,
            userId: req.auth?.id
        });
        res.json(order);
    } catch (error) {
        logger.error(`OrderRoute: GET /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /orders - Create new order
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`OrderRoute: POST /orders - Request started`, { 
        requestId: requestId,
        orderId: req.body.orderId,
        orderQuantity: req.body.orderQuantity,
        userId: req.auth?.id
    });
    
    try {
        const order = await orderService.createOrder(req.body);
        logger.info(`OrderRoute: POST /orders - Request completed successfully`, { 
            requestId: requestId,
            orderIdSeq: order.orderIdSeq,
            orderId: order.orderId,
            userId: req.auth?.id
        });
        res.status(201).json(order);
    } catch (error) {
        logger.error(`OrderRoute: POST /orders - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /orders/:id - Update order
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    
    logger.info(`OrderRoute: PUT /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        updateFields: Object.keys(req.body),
        userId: req.auth?.id
    });
    
    try {
        const order = await orderService.updateOrder(orderId, req.body);
        logger.info(`OrderRoute: PUT /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            orderName: order.orderId,
            userId: req.auth?.id
        });
        res.json(order);
    } catch (error) {
        if (error.message === "Order not found") {
            logger.warn(`OrderRoute: PUT /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`OrderRoute: PUT /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /orders/:id - Delete order
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    
    logger.info(`OrderRoute: DELETE /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        userId: req.auth?.id
    });
    
    try {
        const result = await orderService.deleteOrder(orderId);
        logger.info(`OrderRoute: DELETE /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Order not found") {
            logger.warn(`OrderRoute: DELETE /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`OrderRoute: DELETE /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
