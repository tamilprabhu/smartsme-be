const express = require('express');
const router = express.Router();
const employeeService = require('../services/employee');
const { SortBy, SortOrder } = require('../constants/sort');
const authenticateToken = require('../middlewares/authenticate');

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

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
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

// Create new employee
router.post('/', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const employee = await employeeService.createEmployee(req.body, companyId, userId);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update employee
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const employee = await employeeService.updateEmployee(req.params.id, req.body, companyId, userId);
        res.json(employee);
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
});

// Delete employee
router.delete('/:id', authenticateToken, async (req, res) => {
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

module.exports = router;
