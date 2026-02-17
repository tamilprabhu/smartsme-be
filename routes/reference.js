const express = require('express');
const router = express.Router();
const referenceService = require('../services/reference');
const authenticate = require('../middlewares/authenticate');
const logger = require('../config/logger');

// GET /reference/states - Get all states
router.get('/states', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    
    logger.info('GET /reference/states - Fetching all states', { requestId, username });
    
    try {
        const states = await referenceService.getAllStates();
        logger.info(`GET /reference/states - Successfully retrieved ${states.length} states`, { requestId, username });
        res.json(states);
    } catch (error) {
        logger.error('GET /reference/states - Failed to fetch states', { 
            requestId, 
            username, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch states' });
    }
});

// GET /reference/districts/:stateId - Get districts by state
router.get('/districts/:stateId', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { stateId } = req.params;
    
    logger.info(`GET /reference/districts/${stateId} - Fetching districts`, { requestId, username, stateId });
    
    try {
        const districts = await referenceService.getDistrictsByState(stateId);
        logger.info(`GET /reference/districts/${stateId} - Successfully retrieved ${districts.length} districts`, { 
            requestId, 
            username, 
            stateId 
        });
        res.json(districts);
    } catch (error) {
        logger.error(`GET /reference/districts/${stateId} - Failed to fetch districts`, { 
            requestId, 
            username, 
            stateId, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

// GET /reference/pincodes?pincode=560001 - Search pincodes
router.get('/pincodes', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { pincode } = req.query;
    
    if (!pincode) {
        return res.status(400).json({ error: 'Pincode query parameter is required' });
    }
    
    logger.info(`GET /reference/pincodes - Searching pincode: ${pincode}`, { requestId, username, pincode });
    
    try {
        const pincodes = await referenceService.searchPincodes(pincode);
        logger.info(`GET /reference/pincodes - Successfully retrieved ${pincodes.length} results`, { 
            requestId, 
            username, 
            pincode 
        });
        res.json(pincodes);
    } catch (error) {
        logger.error(`GET /reference/pincodes - Failed to search pincodes`, { 
            requestId, 
            username, 
            pincode, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to search pincodes' });
    }
});

module.exports = router;
