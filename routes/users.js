const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const authenticate = require('../middlewares/authenticate');
const logger = require('../config/logger');
const { SortBy, SortOrder } = require('../constants/sort');

// GET /users - Get all users with pagination and search
router.get('/', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    logger.info('GET /users - Fetching users with pagination', { 
        requestId, 
        username, 
        page, 
        itemsPerPage,
        search 
    });
    
    try {
        const result = await userService.getAllUsers(page, itemsPerPage, search, sortBy, sortOrder);
        logger.info(`GET /users - Successfully retrieved ${result.items.length} users`, { 
            requestId, 
            username,
            totalCount: result.paging.totalItems
        });
        res.json(result);
    } catch (error) {
        logger.error('GET /users - Failed to fetch users', { 
            requestId, 
            username, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET /users/:id - Get user by ID
router.get('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;
    
    logger.info(`GET /users/${id} - Fetching user`, { requestId, username, userId: id });
    
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            logger.warn(`GET /users/${id} - User not found`, { requestId, username, userId: id });
            return res.status(404).json({ error: 'User not found' });
        }
        
        logger.info(`GET /users/${id} - Successfully retrieved user`, { requestId, username, userId: id });
        res.json(user);
    } catch (error) {
        logger.error(`GET /users/${id} - Failed to fetch user`, { 
            requestId, 
            username, 
            userId: id, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST /users - Create new user
router.post('/', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const userId = req.auth.getUserId();
    
    logger.info('POST /users - Creating new user', { requestId, username, newUsername: req.body.username });
    
    try {
        const user = await userService.createUser(req.body, userId);
        logger.info(`POST /users - Successfully created user`, { requestId, username, newUserId: user.id });
        res.status(201).json(user);
    } catch (error) {
        logger.error('POST /users - Failed to create user', { 
            requestId, 
            username, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// PUT /users/:id - Update user
router.put('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const actingUserId = req.auth.getUserId();
    const { id } = req.params;
    
    logger.info(`PUT /users/${id} - Updating user`, { requestId, username, userId: id });
    
    try {
        const user = await userService.updateUser(id, req.body, actingUserId);
        if (!user) {
            logger.warn(`PUT /users/${id} - User not found for update`, { requestId, username, userId: id });
            return res.status(404).json({ error: 'User not found' });
        }
        
        logger.info(`PUT /users/${id} - Successfully updated user`, { requestId, username, userId: id });
        res.json(user);
    } catch (error) {
        logger.error(`PUT /users/${id} - Failed to update user`, { 
            requestId, 
            username, 
            userId: id, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE /users/:id - Delete user
router.delete('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;
    
    logger.info(`DELETE /users/${id} - Deleting user`, { requestId, username, userId: id });
    
    try {
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            logger.warn(`DELETE /users/${id} - User not found for deletion`, { requestId, username, userId: id });
            return res.status(404).json({ error: 'User not found' });
        }
        
        logger.info(`DELETE /users/${id} - Successfully deleted user`, { requestId, username, userId: id });
        res.status(204).send();
    } catch (error) {
        logger.error(`DELETE /users/${id} - Failed to delete user`, { 
            requestId, 
            username, 
            userId: id, 
            error: error.message 
        });
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
