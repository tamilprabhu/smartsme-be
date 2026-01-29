const express = require("express");
const router = express.Router();
const dispatchService = require("../services/dispatch");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");

// GET /dispatches - Get all dispatches with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    
    logger.info(`DispatchRoute: GET /dispatches - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.auth?.id
    });
    
    try {
        const result = await dispatchService.getAllDispatches(page, itemsPerPage, search);
        logger.info(`DispatchRoute: GET /dispatches - Request completed successfully`, { 
            requestId: requestId,
            dispatchCount: result.items.length,
            totalCount: result.paging.totalItems,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (error) {
        logger.error(`DispatchRoute: GET /dispatches - Request failed`, { 
            requestId: requestId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /dispatches/:id - Get dispatch by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const dispatchId = req.params.id;
    
    try {
        const dispatch = await dispatchService.getDispatchById(dispatchId);
        if (!dispatch) {
            return res.status(404).json({ error: "Dispatch not found" });
        }
        res.json(dispatch);
    } catch (error) {
        logger.error(`DispatchRoute: GET /dispatches/${dispatchId} - Request failed`, { 
            requestId: requestId,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /dispatches - Create new dispatch
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
        const dispatch = await dispatchService.createDispatch(req.body);
        res.status(201).json(dispatch);
    } catch (error) {
        logger.error(`DispatchRoute: POST /dispatches - Request failed`, { 
            requestId: requestId,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /dispatches/:id - Update dispatch
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const dispatchId = req.params.id;
    
    try {
        const dispatch = await dispatchService.updateDispatch(dispatchId, req.body);
        res.json(dispatch);
    } catch (error) {
        if (error.message === "Dispatch not found") {
            return res.status(404).json({ error: error.message });
        }
        logger.error(`DispatchRoute: PUT /dispatches/${dispatchId} - Request failed`, { 
            requestId: requestId,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /dispatches/:id - Delete dispatch
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const dispatchId = req.params.id;
    
    try {
        const result = await dispatchService.deleteDispatch(dispatchId);
        res.json(result);
    } catch (error) {
        if (error.message === "Dispatch not found") {
            return res.status(404).json({ error: error.message });
        }
        logger.error(`DispatchRoute: DELETE /dispatches/${dispatchId} - Request failed`, { 
            requestId: requestId,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
