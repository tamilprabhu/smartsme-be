const express = require("express");
const router = express.Router();
const productionShiftService = require("../services/productionShift");
const optionalAuth = require("../middlewares/optionalAuth");
const authenticate = require("../middlewares/authenticate");
const { SYSTEM_ROLES } = require("../constants/roles");
const logger = require("../config/logger");

const hasPermission = (userRoles, requiredPermission) => {
    if (userRoles.some(role => role.id === SYSTEM_ROLES.GUEST.id)) {
        return requiredPermission.includes('READ');
    }
    return userRoles.some(role => ['OWNER', 'ADMIN', 'PLANT_HEAD', 'SHIFT_INCHARGE'].includes(role.name));
};

router.get("/", optionalAuth, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const { page = 1, limit = 10, search = '' } = req.query;
    
    logger.info(`ProductionShiftRoute: GET /production-shift - Request started`, { 
        requestId: requestId,
        page: page,
        limit: limit,
        search: search,
        userId: req.user?.id,
        userRoles: req.user?.roles?.map(r => r.name)
    });
    
    try {
        if (!hasPermission(req.user.roles, 'SHIFT_READ')) {
            logger.warn(`ProductionShiftRoute: GET /production-shift - Access denied`, { 
                requestId: requestId,
                userId: req.user?.id,
                userRoles: req.user?.roles?.map(r => r.name)
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const { page = 1, itemsPerPage = 10, search = '' } = req.query;
        
        const result = await productionShiftService.getAllProductionShifts(page, itemsPerPage, search);
        logger.info(`ProductionShiftRoute: GET /production-shift - Request completed successfully`, { 
            requestId: requestId,
            shiftsReturned: result.items.length,
            totalCount: result.paging.totalItems,
            page: result.paging.currentPage,
            userId: req.user?.id
        });
        res.json(result);
    } catch (err) {
        logger.error(`ProductionShiftRoute: GET /production-shift - Request failed`, { 
            requestId: requestId,
            error: err.message,
            userId: req.user?.id,
            stack: err.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", optionalAuth, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shiftId = req.params.id;
    
    logger.info(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request started`, { 
        requestId: requestId,
        shiftId: shiftId,
        userId: req.user?.id
    });
    
    try {
        if (!hasPermission(req.user.roles, 'SHIFT_READ')) {
            logger.warn(`ProductionShiftRoute: GET /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const shift = await productionShiftService.getProductionShiftById(shiftId);
        if (!shift) {
            logger.warn(`ProductionShiftRoute: GET /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: "Shift not found" });
        }
        
        logger.info(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            shiftName: shift.shiftId,
            userId: req.user?.id
        });
        res.json(shift);
    } catch (err) {
        logger.error(`ProductionShiftRoute: GET /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: err.message,
            userId: req.user?.id,
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
        userId: req.user?.id
    });
    
    try {
        if (!hasPermission(req.user.roles, 'SHIFT_CREATE')) {
            logger.warn(`ProductionShiftRoute: POST /production-shift - Access denied`, { 
                requestId: requestId,
                userId: req.user?.id,
                userRoles: req.user?.roles?.map(r => r.name)
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const shift = await productionShiftService.createProductionShift(req.body);
        logger.info(`ProductionShiftRoute: POST /production-shift - Request completed successfully`, { 
            requestId: requestId,
            shiftIdSeq: shift.shiftIdSeq,
            shiftId: shift.shiftId,
            userId: req.user?.id
        });
        res.status(201).json(shift);
    } catch (err) {
        logger.error(`ProductionShiftRoute: POST /production-shift - Request failed`, { 
            requestId: requestId,
            error: err.message,
            requestBody: req.body,
            userId: req.user?.id,
            stack: err.stack
        });
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
        userId: req.user?.id
    });
    
    try {
        if (!hasPermission(req.user.roles, 'SHIFT_UPDATE')) {
            logger.warn(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const shift = await productionShiftService.updateProductionShift(shiftId, req.body);
        logger.info(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            shiftName: shift.shiftId,
            userId: req.user?.id
        });
        res.json(shift);
    } catch (err) {
        if (err.message === 'Shift not found') {
            logger.warn(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: err.message });
        }
        logger.error(`ProductionShiftRoute: PUT /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: err.message,
            userId: req.user?.id,
            stack: err.stack
        });
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shiftId = req.params.id;
    
    logger.info(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request started`, { 
        requestId: requestId,
        shiftId: shiftId,
        userId: req.user?.id
    });
    
    try {
        if (!hasPermission(req.user.roles, 'SHIFT_DELETE')) {
            logger.warn(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Access denied`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(403).json({ error: "Insufficient permissions" });
        }

        const result = await productionShiftService.deleteProductionShift(shiftId);
        logger.info(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request completed successfully`, { 
            requestId: requestId,
            shiftId: shiftId,
            userId: req.user?.id
        });
        res.json(result);
    } catch (err) {
        if (err.message === 'Shift not found') {
            logger.warn(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Shift not found`, { 
                requestId: requestId,
                shiftId: shiftId,
                userId: req.user?.id
            });
            return res.status(404).json({ error: err.message });
        }
        logger.error(`ProductionShiftRoute: DELETE /production-shift/${shiftId} - Request failed`, { 
            requestId: requestId,
            shiftId: shiftId,
            error: err.message,
            userId: req.user?.id,
            stack: err.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
