const express = require('express');
const router = express.Router();
const prodHourlyService = require('../services/prodHourly');
const authenticateToken = require('../middlewares/authenticate');

// Get all production hourlies with pagination and search
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';
        
        const result = await prodHourlyService.getAllProdHourlies(page, itemsPerPage, search);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get production hourly by composite key
router.get('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const prodHourly = await prodHourlyService.getProdHourlyById(
            req.params.orderId, 
            req.params.companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime
        );
        if (!prodHourly) {
            return res.status(404).json({ error: 'Production hourly not found' });
        }
        res.json(prodHourly);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new production hourly
router.post('/', authenticateToken, async (req, res) => {
    try {
        const prodHourly = await prodHourlyService.createProdHourly(req.body);
        res.status(201).json(prodHourly);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update production hourly
router.put('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const prodHourly = await prodHourlyService.updateProdHourly(
            req.params.orderId, 
            req.params.companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime, 
            req.body
        );
        res.json(prodHourly);
    } catch (error) {
        if (error.message === 'Production hourly not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
});

// Delete production hourly
router.delete('/:orderId/:companyId/:shiftId/:shiftStartTime', authenticateToken, async (req, res) => {
    try {
        const result = await prodHourlyService.deleteProdHourly(
            req.params.orderId, 
            req.params.companyId, 
            req.params.shiftId, 
            req.params.shiftStartTime
        );
        res.json(result);
    } catch (error) {
        if (error.message === 'Production hourly not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
