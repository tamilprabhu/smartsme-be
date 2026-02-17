const express = require('express');
const router = express.Router();
const companyService = require('../services/company');
const authenticate = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');
const logger = require('../config/logger');
const { SortBy, SortOrder } = require('../constants/sort');
const { fromHttpRequest } = require('../utils/context');

// GET /company - Get all companies with pagination and search
router.get('/', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    logger.info('GET /company - Fetching companies with pagination', { 
        requestId, 
        username, 
        page, 
        itemsPerPage,
        search 
    });
    
    try {
        const result = await companyService.getAllCompanies(page, itemsPerPage, search, sortBy, sortOrder);
        logger.info(`GET /company - Successfully retrieved ${result.items.length} companies`, { 
            requestId, 
            username,
            totalCount: result.paging.totalItems
        });
        res.json(result);
    } catch (error) {
        logger.error('GET /company - Failed to fetch companies', { 
            requestId, 
            username, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

// GET /company/:id - Get company by ID
router.get('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;
    
    logger.info(`GET /company/${id} - Fetching company`, { requestId, username, companyId: id });
    
    try {
        const company = await companyService.getCompanyById(id);
        if (!company) {
            logger.warn(`GET /company/${id} - Company not found`, { requestId, username, companyId: id });
            return res.status(404).json({ error: 'Company not found' });
        }
        
        logger.info(`GET /company/${id} - Successfully retrieved company`, { requestId, username, companyId: id });
        res.json(company);
    } catch (error) {
        logger.error(`GET /company/${id} - Failed to fetch company`, { 
            requestId, 
            username, 
            companyId: id, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch company' });
    }
});

// POST /company - Create new company
router.post('/', authenticate, async (req, res, next) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    
    logger.info('POST /company - Creating new company', { requestId, username, companyName: req.body.companyName });
    
    try {
        const context = fromHttpRequest(req);
        const company = await companyService.createCompany(req.body, context);
        logger.info(`POST /company - Successfully created company`, { requestId, username, companyId: company.companySequence });
        res.status(201).json(company);
    } catch (error) {
        logger.error('POST /company - Failed to create company', { 
            requestId, 
            username, 
            error: error.message 
        });
        next(error);
    }
});

// PUT /company/:id - Update company
router.put('/:id', authenticate, async (req, res, next) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;
    
    logger.info(`PUT /company/${id} - Updating company`, { requestId, username, companyId: id });
    
    try {
        const context = fromHttpRequest(req);
        const company = await companyService.updateCompany(id, req.body, context);
        if (!company) {
            logger.warn(`PUT /company/${id} - Company not found for update`, { requestId, username, companyId: id });
            return res.status(404).json({ error: 'Company not found' });
        }
        
        logger.info(`PUT /company/${id} - Successfully updated company`, { requestId, username, companyId: id });
        res.json(company);
    } catch (error) {
        logger.error(`PUT /company/${id} - Failed to update company`, { 
            requestId, 
            username, 
            companyId: id, 
            error: error.message 
        });
        next(error);
    }
});

// DELETE /company/:id - Delete company
router.delete('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;
    
    logger.info(`DELETE /company/${id} - Deleting company`, { requestId, username, companyId: id });
    
    try {
        const context = fromHttpRequest(req);
        const deleted = await companyService.deleteCompany(id, context);
        if (!deleted) {
            logger.warn(`DELETE /company/${id} - Company not found for deletion`, { requestId, username, companyId: id });
            return res.status(404).json({ error: 'Company not found' });
        }
        
        logger.info(`DELETE /company/${id} - Successfully deleted company`, { requestId, username, companyId: id });
        res.status(204).send();
    } catch (error) {
        logger.error(`DELETE /company/${id} - Failed to delete company`, { 
            requestId, 
            username, 
            companyId: id, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to delete company' });
    }
});

router.use(errorHandler);

module.exports = router;
