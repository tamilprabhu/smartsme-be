const express = require("express");
const router = express.Router();
const stockService = require("../services/stock");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");

// GET /stocks - Get all stocks with pagination and search
router.get("/", authenticate, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await stockService.getAllStocks(page, itemsPerPage, search, companyId, sortBy, sortOrder);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /stocks/:id - Get stock by ID
router.get("/:id", authenticate, async (req, res) => {
    const stockId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const stock = await stockService.getStockById(stockId, companyId);
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /stocks - Create new stock
router.post("/", authenticate, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const stock = await stockService.createStock(req.body, companyId, userId);
        res.status(201).json(stock);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /stocks/:id - Update stock
router.put("/:id", authenticate, async (req, res) => {
    const stockId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const stock = await stockService.updateStock(stockId, req.body, companyId, userId);
        res.json(stock);
    } catch (error) {
        if (error.message === "Stock not found") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /stocks/:id - Delete stock
router.delete("/:id", authenticate, async (req, res) => {
    const stockId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await stockService.deleteStock(stockId, companyId);
        res.json(result);
    } catch (error) {
        if (error.message === "Stock not found") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
