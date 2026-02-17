const express = require('express');
const router = express.Router();
const roleService = require('../services/role');
const authenticate = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');
const logger = require('../config/logger');
const { SortBy, SortOrder } = require('../constants/sort');
const { fromHttpRequest } = require('../utils/context');

// GET /role - Get all roles with pagination and search
router.get('/', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;

    logger.info('GET /role - Fetching roles with pagination', {
        requestId,
        username,
        page,
        itemsPerPage,
        search
    });

    try {
        const result = await roleService.getAllRoles(page, itemsPerPage, search, sortBy, sortOrder);
        logger.info(`GET /role - Successfully retrieved ${result.items.length} roles`, {
            requestId,
            username,
            totalCount: result.paging.totalItems
        });
        res.json(result);
    } catch (error) {
        logger.error('GET /role - Failed to fetch roles', {
            requestId,
            username,
            error: error.message
        });
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

// GET /role/:id - Get role by ID
router.get('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;

    logger.info(`GET /role/${id} - Fetching role`, { requestId, username, roleId: id });

    try {
        const role = await roleService.getRoleById(id);
        if (!role) {
            logger.warn(`GET /role/${id} - Role not found`, { requestId, username, roleId: id });
            return res.status(404).json({ error: 'Role not found' });
        }

        logger.info(`GET /role/${id} - Successfully retrieved role`, { requestId, username, roleId: id });
        res.json(role);
    } catch (error) {
        logger.error(`GET /role/${id} - Failed to fetch role`, {
            requestId,
            username,
            roleId: id,
            error: error.message
        });
        res.status(500).json({ error: 'Failed to fetch role' });
    }
});

// POST /role - Create new role
router.post('/', authenticate, async (req, res, next) => {
    const requestId = req.requestId;
    const username = req.auth?.username;

    logger.info('POST /role - Creating new role', { requestId, username, roleName: req.body.name });

    try {
        const context = fromHttpRequest(req);
        const role = await roleService.createRole(req.body, context);
        logger.info('POST /role - Successfully created role', { requestId, username, roleId: role.id });
        res.status(201).json(role);
    } catch (error) {
        logger.error('POST /role - Failed to create role', {
            requestId,
            username,
            error: error.message
        });
        next(error);
    }
});

// PUT /role/:id - Update role
router.put('/:id', authenticate, async (req, res, next) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;

    logger.info(`PUT /role/${id} - Updating role`, { requestId, username, roleId: id });

    try {
        const context = fromHttpRequest(req);
        const role = await roleService.updateRole(id, req.body, context);
        if (!role) {
            logger.warn(`PUT /role/${id} - Role not found for update`, { requestId, username, roleId: id });
            return res.status(404).json({ error: 'Role not found' });
        }

        logger.info(`PUT /role/${id} - Successfully updated role`, { requestId, username, roleId: id });
        res.json(role);
    } catch (error) {
        logger.error(`PUT /role/${id} - Failed to update role`, {
            requestId,
            username,
            roleId: id,
            error: error.message
        });
        next(error);
    }
});

// DELETE /role/:id - Delete role
router.delete('/:id', authenticate, async (req, res) => {
    const requestId = req.requestId;
    const username = req.auth?.username;
    const { id } = req.params;

    logger.info(`DELETE /role/${id} - Deleting role`, { requestId, username, roleId: id });

    try {
        const context = fromHttpRequest(req);
        const deleted = await roleService.deleteRole(id, context);
        if (!deleted) {
            logger.warn(`DELETE /role/${id} - Role not found for deletion`, { requestId, username, roleId: id });
            return res.status(404).json({ error: 'Role not found' });
        }

        logger.info(`DELETE /role/${id} - Successfully deleted role`, { requestId, username, roleId: id });
        res.status(204).send();
    } catch (error) {
        logger.error(`DELETE /role/${id} - Failed to delete role`, {
            requestId,
            username,
            roleId: id,
            error: error.message
        });
        res.status(500).json({ error: 'Failed to delete role' });
    }
});

router.use(errorHandler);

module.exports = router;
