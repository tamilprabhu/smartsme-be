const express = require("express");
const router = express.Router();
const companyService = require("../services/company");
const optionalAuth = require("../middlewares/optionalAuth");
const authenticate = require("../middlewares/authenticate");
const { SYSTEM_ROLES } = require("../constants/roles");
const { SortBy, SortOrder } = require("../constants/sort");

// Helper function to check permissions
const hasPermission = (userRoles, requiredPermission) => {
    if (userRoles.some(role => role.id === SYSTEM_ROLES.GUEST.id)) {
        return requiredPermission.includes('READ');
    }
    // For now, allow OWNER, ADMIN, PLANT_HEAD full access
    return userRoles.some(role => ['OWNER', 'ADMIN', 'PLANT_HEAD'].includes(role.name));
};

// GET /companies - Get all companies (with guest access)
router.get("/", optionalAuth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    try {
        if (!hasPermission(req.auth.roles, 'COMPANY_READ')) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const result = await companyService.getAllCompanies(page, itemsPerPage, search, sortBy, sortOrder);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /companies/:id - Get company by ID (with guest access)
router.get("/:id", optionalAuth, async (req, res) => {
    try {
        if (!hasPermission(req.auth.roles, 'COMPANY_READ')) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const company = await companyService.getCompanyById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.json(company);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /companies - Create company (authenticated only)
router.post("/", authenticate, async (req, res) => {
    try {
        if (!hasPermission(req.auth.roles, 'COMPANY_CREATE')) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const company = await companyService.createCompany(req.body);
        res.status(201).json(company);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /companies/:id - Update company (authenticated only)
router.put("/:id", authenticate, async (req, res) => {
    try {
        if (!hasPermission(req.auth.roles, 'COMPANY_UPDATE')) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const company = await companyService.updateCompany(req.params.id, req.body);
        res.json(company);
    } catch (err) {
        if (err.message === 'Company not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(400).json({ error: err.message });
    }
});

// DELETE /companies/:id - Delete company (authenticated only)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        if (!hasPermission(req.auth.roles, 'COMPANY_DELETE')) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const result = await companyService.deleteCompany(req.params.id);
        res.json(result);
    } catch (err) {
        if (err.message === 'Company not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
