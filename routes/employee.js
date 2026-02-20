const express = require('express');
const router = express.Router();
const employeeService = require('../services/employee');
const employeeCreationService = require('../services/employeeCreation');
const { SortBy, SortOrder } = require('../constants/sort');
const ItemsPerPage = require('../constants/pagination');
const authenticateToken = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');
const { fromHttpRequest } = require('../utils/context');

// Get employees with user details and role mapping
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = ItemsPerPage.isValid(parseInt(req.query.itemsPerPage))
            ? parseInt(req.query.itemsPerPage)
            : ItemsPerPage.TEN;
        const search = req.query.search || '';
        const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
        const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await employeeCreationService.getAllEmployeesWithUser(
            page, itemsPerPage, search, companyId, sortBy, sortOrder
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get employees by role
router.get('/role/:roleName', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';

        const companyId = req.auth.getPrimaryCompanyId();
        const excludeUserId = req.auth.getUserId();
        const roleNames = req.params.roleName
            .split(',')
            .map(role => role.trim())
            .filter(Boolean);

        if (!roleNames.length) {
            return res.status(400).json({ error: 'roleName param is required' });
        }

        const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
        const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;

        const result = await employeeService.getEmployeesByRole(roleNames, companyId, {
            excludeUserId,
            page,
            itemsPerPage,
            search,
            sortBy,
            sortOrder
        });
        res.json({
            ...result,
            items: employeeService.toEmployeeDropdownList(result.items)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create employee with user account and role
router.post('/', authenticateToken, async (req, res, next) => {
    try {
        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();

        const result = await employeeCreationService.createEmployeeWithUser(req.body, context);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// Get employee with user by employee sequence
router.get('/:employeeId', authenticateToken, async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            return res.status(400).json({ error: 'employeeId must be a positive integer' });
        }

        const companyId = req.auth.getPrimaryCompanyId();
        const employee = await employeeCreationService.getEmployeeWithUserByEmployeeSequence(
            employeeId,
            companyId
        );

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update employee with user
router.patch('/:employeeId', authenticateToken, async (req, res, next) => {
    try {
        const employeeId = Number(req.params.employeeId);
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            return res.status(400).json({ error: 'employeeId must be a positive integer' });
        }

        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();

        const result = await employeeCreationService.updateEmployeeWithUser(
            employeeId,
            req.body,
            context
        );
        res.json(result);
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
});

// Delete employee with user
router.delete('/:employeeId', authenticateToken, async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            return res.status(400).json({ error: 'employeeId must be a positive integer' });
        }

        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();

        await employeeCreationService.deleteEmployeeWithUser(employeeId, context);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

router.use(errorHandler);

module.exports = router;
