const express = require('express');
const router = express.Router();
const employeeService = require('../services/employee');
const employeeCreationService = require('../services/employeeCreation');
const { SortBy, SortOrder } = require('../constants/sort');
const ItemsPerPage = require('../constants/pagination');
const authenticateToken = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');
const { fromHttpRequest } = require('../utils/context');

// Get all employees with pagination and search
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';
        const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
        const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
        
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await employeeService.getAllEmployees(page, itemsPerPage, search, companyId, sortBy, sortOrder);
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

// Create new employee
router.post('/', authenticateToken, async (req, res, next) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const employee = await employeeService.createEmployee(req.body, companyId, userId);
        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
});

// Create employee with user account and role
router.post('/with-user', authenticateToken, async (req, res, next) => {
    try {
        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();
        
        const result = await employeeCreationService.createEmployeeWithUser(req.body, context);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// Get all employees with user details
router.get('/with-user', authenticateToken, async (req, res) => {
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

// Get employee with user by userId
router.get('/with-user/:userId(\\d+)', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const employee = await employeeCreationService.getEmployeeWithUserById(
            req.params.userId, 
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
router.put('/with-user/:userId(\\d+)', authenticateToken, async (req, res, next) => {
    try {
        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();
        
        const result = await employeeCreationService.updateEmployeeWithUser(
            req.params.userId,
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
router.delete('/with-user/:userId(\\d+)', authenticateToken, async (req, res) => {
    try {
        const context = fromHttpRequest(req);
        context.companyId = req.auth.getPrimaryCompanyId();
        
        await employeeCreationService.deleteEmployeeWithUser(req.params.userId, context);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

// Update employee
router.put('/:id(\\d+)', authenticateToken, async (req, res, next) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const employee = await employeeService.updateEmployee(req.params.id, req.body, companyId, userId);
        res.json(employee);
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
});

// Delete employee
router.delete('/:id(\\d+)', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const result = await employeeService.deleteEmployee(req.params.id, companyId, userId);
        res.json(result);
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

// Get employee by ID
router.get('/:id(\\d+)', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const employee = await employeeService.getEmployeeById(req.params.id, companyId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.use(errorHandler);

module.exports = router;
