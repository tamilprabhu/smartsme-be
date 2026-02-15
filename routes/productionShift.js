const express = require("express");
const router = express.Router();
const productionShiftService = require("../services/productionShift");
const optionalAuth = require("../middlewares/optionalAuth");
const authenticate = require("../middlewares/authenticate");
const { SYSTEM_ROLES } = require("../constants/roles");
const { SortBy, SortOrder } = require("../constants/sort");
const logger = require("../config/logger");

const getFieldwiseValidationErrors = (err) => {
    if (err?.name === "SequelizeValidationError" && Array.isArray(err.errors)) {
        const fieldErrors = {};

        err.errors.forEach((validationError) => {
            const field = validationError?.path || "base";
            const message = validationError?.message;

            if (!message) return;
            if (!fieldErrors[field]) fieldErrors[field] = [];
            if (!fieldErrors[field].includes(message)) fieldErrors[field].push(message);
        });

        if (Object.keys(fieldErrors).length > 0) return fieldErrors;
    }

    return null;
};

const hasPermission = (userRoles, requiredPermission) => {
    if (userRoles.some(role => role.id === SYSTEM_ROLES.GUEST.id)) {
        return requiredPermission.includes('READ'); // If it is a guest, allow only READ
    }
    return userRoles.some(role => ['OWNER', 'ADMIN', 'PLANT_HEAD', 'SHIFT_INCHARGE', 'PRODUCTION_EMPLOYEE'].includes(role.name));
};

router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    logger.info(`ProductionShiftRoute: GET /production-shift - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.auth?.id,
        userRoles: req.auth?.roles?.map(r => r.name)
    });
    
    try {
        if (!hasPermission(req.auth.roles, 'SHIFT_READ')) {
            logger.warn(`ProductionShiftRoute: GET /production-shift - Access denied`, { 
                requestId: requestId,
                userId: req.auth?.id,
                userRoles: req.auth?.roles?.map(r => r.name)
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }
        
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await productionShiftService.getAllProductionShifts(page, itemsPerPage, search, companyId, sortBy, sortOrder);
        logger.info(`ProductionShiftRoute: GET /production-shift - Request completed successfully`, { 
            requestId: requestId,
            shiftsReturned: result.items.length,
            totalCount: result.paging.totalItems,
            page: result.paging.currentPage,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (err) {
        logger.error(`ProductionShiftRoute: GET /production-shift - Request failed`, { 
            requestId: requestId,
            error: err.message,
            userId: req.auth?.id,
            stack: err.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shiftId = req.params.id;
    
    logger.info(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request started`, { 
        requestId: requestId,
        shiftId: shiftId,
        userId: req.auth?.id
    });
    
    try {
        if (!hasPermission(req.auth.roles, 'SHIFT_READ')) {
            logger.warn(`ProductionShiftRoute: GET /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const companyId = req.auth.getPrimaryCompanyId();
        const shift = await productionShiftService.getProductionShiftById(shiftId, companyId);
        if (!shift) {
            logger.warn(`ProductionShiftRoute: GET /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: "Shift not found" });
        }
        
        logger.info(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            shiftName: shift.shiftId,
            userId: req.auth?.id
        });
        res.json(shift);
    } catch (err) {
        logger.error(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: err.message,
            userId: req.auth?.id,
            stack: err.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`ProductionShiftRoute: POST /production-shift - Request started`, { 
        requestId: requestId,
        shiftId: req.body.shiftId,
        orderId: req.body.orderId,
        machineId: req.body.machineId,
        userId: req.auth?.id
    });
    
    try {
        if (!hasPermission(req.auth.roles, 'SHIFT_CREATE')) {
            logger.warn(`ProductionShiftRoute: POST /production-shift - Access denied`, { 
                requestId: requestId,
                userId: req.auth?.id,
                userRoles: req.auth?.roles?.map(r => r.name)
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const shift = await productionShiftService.createProductionShift(req.body, companyId, userId);
        logger.info(`ProductionShiftRoute: POST /production-shift - Request completed successfully`, { 
            requestId: requestId,
            shiftIdSeq: shift.shiftIdSeq,
            shiftId: shift.shiftId,
            userId: req.auth?.id
        });
        res.status(201).json(shift);
    } catch (err) {
        const validationErrors = getFieldwiseValidationErrors(err);
        logger.error(`ProductionShiftRoute: POST /production-shift - Request failed`, { 
            requestId: requestId,
            error: validationErrors || err.message,
            requestBody: req.body,
            userId: req.auth?.id,
            stack: err.stack
        });
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shiftId = req.params.id;
    
    logger.info(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Request started`, { 
        requestId: requestId,
        shiftId: shiftId,
        updateFields: Object.keys(req.body),
        userId: req.auth?.id
    });
    
    try {
        if (!hasPermission(req.auth.roles, 'SHIFT_UPDATE')) {
            logger.warn(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const shift = await productionShiftService.updateProductionShift(shiftId, req.body, companyId, userId);
        logger.info(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            shiftName: shift.shiftId,
            userId: req.auth?.id
        });
        res.json(shift);
    } catch (err) {
        if (err.message === 'Shift not found') {
            logger.warn(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: err.message });
        }
        const validationErrors = getFieldwiseValidationErrors(err);
        logger.error(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: validationErrors || err.message,
            userId: req.auth?.id,
            stack: err.stack
        });
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shiftId = req.params.id;
    
    logger.info(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request started`, { 
        requestId: requestId,
        shiftId: shiftId,
        userId: req.auth?.id
    });
    
    try {
        if (!hasPermission(req.auth.roles, 'SHIFT_DELETE')) {
            logger.warn(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const companyId = req.auth.getPrimaryCompanyId();
        const result = await productionShiftService.deleteProductionShift(shiftId, companyId);
        logger.info(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (err) {
        if (err.message === 'Shift not found') {
            logger.warn(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: err.message });
        }
        logger.error(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: err.message,
            userId: req.auth?.id,
            stack: err.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
