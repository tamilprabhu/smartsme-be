const express = require("express");
const router = express.Router();
const orderService = require("../services/order");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");

// GET /orders - Get all orders with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`OrderRoute: GET /orders - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const result = await orderService.getAllOrders(page, itemsPerPage, search, companyId, sortBy, sortOrder);
        logger.info(`OrderRoute: GET /orders - Request completed successfully`, { 
            requestId: requestId,
            orderCount: result.items.length,
            totalCount: result.paging.totalItems,
            companyId: companyId,
            userId: userId
        });
        res.json(result);
    } catch (error) {
        logger.error(`OrderRoute: GET /orders - Request failed`, { 
            requestId: requestId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /orders/:id - Get order by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`OrderRoute: GET /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const order = await orderService.getOrderById(orderId, companyId);
        if (!order) {
            logger.warn(`OrderRoute: GET /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: "Order not found" });
        }
        
        logger.info(`OrderRoute: GET /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            orderName: order.orderId,
            companyId: companyId,
            userId: userId
        });
        res.json(order);
    } catch (error) {
        logger.error(`OrderRoute: GET /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /orders - Create new order
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`OrderRoute: POST /orders - Request started`, { 
        requestId: requestId,
        orderId: req.body.orderId,
        orderQuantity: req.body.orderQuantity,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const order = await orderService.createOrder(req.body, companyId, userId);
        logger.info(`OrderRoute: POST /orders - Request completed successfully`, { 
            requestId: requestId,
            orderSequence: order.orderSequence,
            orderId: order.orderId,
            companyId: companyId,
            userId: userId
        });
        res.status(201).json(order);
    } catch (error) {
        logger.error(`OrderRoute: POST /orders - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /orders/:id - Update order
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`OrderRoute: PUT /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        updateFields: Object.keys(req.body),
        companyId: companyId,
        userId: userId
    });
    
    try {
        const order = await orderService.updateOrder(orderId, req.body, companyId, userId);
        logger.info(`OrderRoute: PUT /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            orderName: order.orderId,
            companyId: companyId,
            userId: userId
        });
        res.json(order);
    } catch (error) {
        if (error.message === "Order not found") {
            logger.warn(`OrderRoute: PUT /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`OrderRoute: PUT /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /orders/:id - Delete order
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`OrderRoute: DELETE /orders/${orderId} - Request started`, { 
        requestId: requestId,
        orderId: orderId,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const result = await orderService.deleteOrder(orderId, companyId);
        logger.info(`OrderRoute: DELETE /orders/${orderId} - Request completed successfully`, { 
            requestId: requestId,
            orderId: orderId,
            companyId: companyId,
            userId: userId
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Order not found") {
            logger.warn(`OrderRoute: DELETE /orders/${orderId} - Order not found`, { 
                requestId: requestId,
                orderId: orderId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`OrderRoute: DELETE /orders/${orderId} - Request failed`, { 
            requestId: requestId,
            orderId: orderId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
