const express = require("express");
const router = express.Router();
const sellerService = require("../services/seller");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");

// GET /sellers - Get all sellers with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await sellerService.getAllSellers(page, itemsPerPage, search, companyId, sortBy, sortOrder);
        res.json(result);
    } catch (error) {
        logger.error(`SellerRoute: GET /sellers - Request failed`, { 
            requestId: requestId,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /sellers/:id - Get seller by ID
router.get("/:id", authenticate, async (req, res) => {
    const sellerId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const seller = await sellerService.getSellerById(sellerId, companyId);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        res.json(seller);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /sellers - Create new seller
router.post("/", authenticate, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const seller = await sellerService.createSeller(req.body, companyId, userId);
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /sellers/:id - Update seller
router.put("/:id", authenticate, async (req, res) => {
    const sellerId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const seller = await sellerService.updateSeller(sellerId, req.body, companyId, userId);
        res.json(seller);
    } catch (error) {
        if (error.message === "Seller not found") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /sellers/:id - Delete seller
router.delete("/:id", authenticate, async (req, res) => {
    const sellerId = req.params.id;
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await sellerService.deleteSeller(sellerId, companyId);
        res.json(result);
    } catch (error) {
        if (error.message === "Seller not found") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
