const express = require("express");
const router = express.Router();
const buyerService = require("../services/buyer");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");

// GET /buyers - Get all buyers with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    
    logger.info(`BuyerRoute: GET /buyers - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.user?.id
    });
    
    try {
        const result = await buyerService.getAllBuyers(page, itemsPerPage, search);
        logger.info(`BuyerRoute: GET /buyers - Request completed successfully`, { 
            requestId: requestId,
            buyerCount: result.items.length,
            totalCount: result.paging.totalItems,
            userId: req.user?.id
        });
        res.json(result);
    } catch (error) {
        logger.error(`BuyerRoute: GET /buyers - Request failed`, { 
            requestId: requestId,
            error: error.message,
            userId: req.user?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /buyers/:id - Get buyer by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const buyerId = req.params.id;
    
    logger.info(`BuyerRoute: GET /buyers/${buyerId} - Request started`, { 
        requestId: requestId,
        buyerId: buyerId,
        userId: req.user?.id
    });
    
    try {
        const buyer = await buyerService.getBuyerById(buyerId);
        if (!buyer) {
            logger.warn(`BuyerRoute: GET /buyers/${buyerId} - Buyer not found`, { 
                requestId: requestId,
                buyerId: buyerId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: "Buyer not found" });
        }
        
        logger.info(`BuyerRoute: GET /buyers/${buyerId} - Request completed successfully`, { 
            requestId: requestId,
            buyerId: buyerId,
            buyerName: buyer.buyerName,
            userId: req.user?.id
        });
        res.json(buyer);
    } catch (error) {
        logger.error(`BuyerRoute: GET /buyers/${buyerId} - Request failed`, { 
            requestId: requestId,
            buyerId: buyerId,
            error: error.message,
            userId: req.user?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /buyers - Create new buyer
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`BuyerRoute: POST /buyers - Request started`, { 
        requestId: requestId,
        buyerName: req.body.buyerName,
        companyId: req.body.companyId,
        userId: req.user?.id
    });
    
    try {
        const buyer = await buyerService.createBuyer(req.body);
        logger.info(`BuyerRoute: POST /buyers - Request completed successfully`, { 
            requestId: requestId,
            buyerId: buyer.buyerIdSeq,
            buyerName: buyer.buyerName,
            userId: req.user?.id
        });
        res.status(201).json(buyer);
    } catch (error) {
        logger.error(`BuyerRoute: POST /buyers - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            userId: req.user?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /buyers/:id - Update buyer
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const buyerId = req.params.id;
    
    logger.info(`BuyerRoute: PUT /buyers/${buyerId} - Request started`, { 
        requestId: requestId,
        buyerId: buyerId,
        updateFields: Object.keys(req.body),
        userId: req.user?.id
    });
    
    try {
        const buyer = await buyerService.updateBuyer(buyerId, req.body);
        logger.info(`BuyerRoute: PUT /buyers/${buyerId} - Request completed successfully`, { 
            requestId: requestId,
            buyerId: buyerId,
            buyerName: buyer.buyerName,
            userId: req.user?.id
        });
        res.json(buyer);
    } catch (error) {
        if (error.message === "Buyer not found") {
            logger.warn(`BuyerRoute: PUT /buyers/${buyerId} - Buyer not found`, { 
                requestId: requestId,
                buyerId: buyerId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`BuyerRoute: PUT /buyers/${buyerId} - Request failed`, { 
            requestId: requestId,
            buyerId: buyerId,
            error: error.message,
            userId: req.user?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /buyers/:id - Delete buyer
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const buyerId = req.params.id;
    
    logger.info(`BuyerRoute: DELETE /buyers/${buyerId} - Request started`, { 
        requestId: requestId,
        buyerId: buyerId,
        userId: req.user?.id
    });
    
    try {
        const result = await buyerService.deleteBuyer(buyerId);
        logger.info(`BuyerRoute: DELETE /buyers/${buyerId} - Request completed successfully`, { 
            requestId: requestId,
            buyerId: buyerId,
            userId: req.user?.id
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Buyer not found") {
            logger.warn(`BuyerRoute: DELETE /buyers/${buyerId} - Buyer not found`, { 
                requestId: requestId,
                buyerId: buyerId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`BuyerRoute: DELETE /buyers/${buyerId} - Request failed`, { 
            requestId: requestId,
            buyerId: buyerId,
            error: error.message,
            userId: req.user?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
