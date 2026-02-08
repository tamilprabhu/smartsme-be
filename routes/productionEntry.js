const express = require('express');
const router = express.Router();
const productionEntryService = require('../services/productionEntry');
const authenticateToken = require('../middlewares/authenticate');

// Get all production entries with pagination and search
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';
        const companyId = req.auth.getPrimaryCompanyId();
        
        const result = await productionEntryService.getAllProdEntries(page, itemsPerPage, search, companyId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get production entry by composite key
router.get('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const productionEntry = await productionEntryService.getProductionEntryById(
            req.params.orderId, 
            companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime
        );
        if (!productionEntry) {
            return res.status(404).json({ error: 'Production entry not found' });
        }
        res.json(productionEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new production entry
router.post('/', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const productionEntry = await productionEntryService.createProductionEntry(req.body, companyId, userId);
        res.status(201).json(productionEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update production entry
router.put('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const productionEntry = await productionEntryService.updateProductionEntry(
            req.params.orderId, 
            companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime, 
            req.body,
            userId
        );
        res.json(productionEntry);
    } catch (error) {
        if (error.message === 'Production entry not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
});

// Delete production entry
router.delete('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const result = await productionEntryService.deleteProductionEntry(
            req.params.orderId, 
            companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime,
            userId
        );
        res.json(result);
    } catch (error) {
        if (error.message === 'Production entry not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
