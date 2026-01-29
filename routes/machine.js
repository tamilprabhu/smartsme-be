const express = require("express");
const router = express.Router();
const machineService = require("../services/machine");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");

// GET /machines - Get all machines with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    
    logger.info(`MachineRoute: GET /machines - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await machineService.getAllMachines(page, itemsPerPage, search, companyId);
        logger.info(`MachineRoute: GET /machines - Request completed successfully`, { 
            requestId: requestId,
            machineCount: result.items.length,
            totalCount: result.paging.totalItems,
            userId: req.auth?.id,
            companyId: companyId
        });
        res.json(result);
    } catch (error) {
        logger.error(`MachineRoute: GET /machines - Request failed`, { 
            requestId: requestId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /machines/:id - Get machine by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const machineId = req.params.id;
    
    logger.info(`MachineRoute: GET /machines/${machineId} - Request started`, { 
        requestId: requestId,
        machineId: machineId,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const machine = await machineService.getMachineById(machineId, companyId);
        if (!machine) {
            logger.warn(`MachineRoute: GET /machines/${machineId} - Machine not found`, { 
                requestId: requestId,
                machineId: machineId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: "Machine not found" });
        }
        
        logger.info(`MachineRoute: GET /machines/${machineId} - Request completed successfully`, { 
            requestId: requestId,
            machineId: machineId,
            machineName: machine.machineName,
            userId: req.auth?.id
        });
        res.json(machine);
    } catch (error) {
        logger.error(`MachineRoute: GET /machines/${machineId} - Request failed`, { 
            requestId: requestId,
            machineId: machineId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /machines - Create new machine
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`MachineRoute: POST /machines - Request started`, { 
        requestId: requestId,
        machineName: req.body.machineName,
        machineType: req.body.machineType,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const machine = await machineService.createMachine(req.body, companyId, userId);
        logger.info(`MachineRoute: POST /machines - Request completed successfully`, { 
            requestId: requestId,
            machineId: machine.machineIdSeq,
            machineName: machine.machineName,
            userId: req.auth?.id
        });
        res.status(201).json(machine);
    } catch (error) {
        logger.error(`MachineRoute: POST /machines - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /machines/:id - Update machine
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const machineId = req.params.id;
    
    logger.info(`MachineRoute: PUT /machines/${machineId} - Request started`, { 
        requestId: requestId,
        machineId: machineId,
        updateFields: Object.keys(req.body),
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const machine = await machineService.updateMachine(machineId, req.body, companyId, userId);
        logger.info(`MachineRoute: PUT /machines/${machineId} - Request completed successfully`, { 
            requestId: requestId,
            machineId: machineId,
            machineName: machine.machineName,
            userId: req.auth?.id
        });
        res.json(machine);
    } catch (error) {
        if (error.message === "Machine not found") {
            logger.warn(`MachineRoute: PUT /machines/${machineId} - Machine not found`, { 
                requestId: requestId,
                machineId: machineId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`MachineRoute: PUT /machines/${machineId} - Request failed`, { 
            requestId: requestId,
            machineId: machineId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /machines/:id - Delete machine
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const machineId = req.params.id;
    
    logger.info(`MachineRoute: DELETE /machines/${machineId} - Request started`, { 
        requestId: requestId,
        machineId: machineId,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await machineService.deleteMachine(machineId, companyId);
        logger.info(`MachineRoute: DELETE /machines/${machineId} - Request completed successfully`, { 
            requestId: requestId,
            machineId: machineId,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Machine not found") {
            logger.warn(`MachineRoute: DELETE /machines/${machineId} - Machine not found`, { 
                requestId: requestId,
                machineId: machineId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`MachineRoute: DELETE /machines/${machineId} - Request failed`, { 
            requestId: requestId,
            machineId: machineId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
