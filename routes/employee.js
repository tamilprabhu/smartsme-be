const express = require('express');
const router = express.Router();
const employeeService = require('../services/employee');
const authenticateToken = require('../middlewares/authenticate');

// Get all employees with pagination and search
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
        const search = req.query.search || '';
        
        const result = await employeeService.getAllEmployees(page, itemsPerPage, search);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
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
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update employee
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
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
        const result = await employeeService.deleteEmployee(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Employee not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
