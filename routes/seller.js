const express = require("express");
const router = express.Router();
const sellerService = require("../services/seller");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");

// GET /sellers - Get all sellers with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    
    try {
        const result = await sellerService.getAllSellers(page, itemsPerPage, search);
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
        const seller = await sellerService.getSellerById(sellerId);
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
        const seller = await sellerService.createSeller(req.body);
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /sellers/:id - Update seller
router.put("/:id", authenticate, async (req, res) => {
    const sellerId = req.params.id;
    
    try {
        const seller = await sellerService.updateSeller(sellerId, req.body);
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
        const result = await sellerService.deleteSeller(sellerId);
        res.json(result);
    } catch (error) {
        if (error.message === "Seller not found") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
