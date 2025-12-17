const express = require('express');
const router = express.Router();
const orderQuantityService = require('../services/orderQuantity');
const authenticateToken = require('../middlewares/authenticate');

// Get all order quantities with pagination and search
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';
        
        const result = await orderQuantityService.getAllOrderQuantities(page, itemsPerPage, search);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order quantity by composite key
router.get('/:orderId/:companyId', authenticateToken, async (req, res) => {
    try {
        const orderQuantity = await orderQuantityService.getOrderQuantityById(req.params.orderId, req.params.companyId);
        if (!orderQuantity) {
            return res.status(404).json({ error: 'Order quantity not found' });
        }
        res.json(orderQuantity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new order quantity
router.post('/', authenticateToken, async (req, res) => {
    try {
        const orderQuantity = await orderQuantityService.createOrderQuantity(req.body);
        res.status(201).json(orderQuantity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update order quantity
router.put('/:orderId/:companyId', authenticateToken, async (req, res) => {
    try {
        const orderQuantity = await orderQuantityService.updateOrderQuantity(req.params.orderId, req.params.companyId, req.body);
        res.json(orderQuantity);
    } catch (error) {
        if (error.message === 'Order quantity not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
});

// Delete order quantity
router.delete('/:orderId/:companyId', authenticateToken, async (req, res) => {
    try {
        const result = await orderQuantityService.deleteOrderQuantity(req.params.orderId, req.params.companyId);
        res.json(result);
    } catch (error) {
        if (error.message === 'Order quantity not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
