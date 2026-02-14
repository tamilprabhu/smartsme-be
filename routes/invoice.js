const express = require("express");
const router = express.Router();
const invoiceService = require("../services/invoice");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");

// GET /invoices - Get all invoices with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    
    logger.info(`InvoiceRoute: GET /invoices - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await invoiceService.getAllInvoices(page, itemsPerPage, search, companyId, sortBy, sortOrder);
        logger.info(`InvoiceRoute: GET /invoices - Request completed successfully`, { 
            requestId: requestId,
            invoiceCount: result.items.length,
            totalCount: result.paging.totalItems,
            userId: req.auth?.id,
            companyId: companyId
        });
        res.json(result);
    } catch (error) {
        logger.error(`InvoiceRoute: GET /invoices - Request failed`, { 
            requestId: requestId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /invoices/:id - Get invoice by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const invoiceId = req.params.id;
    
    logger.info(`InvoiceRoute: GET /invoices/${invoiceId} - Request started`, { 
        requestId: requestId,
        invoiceId: invoiceId,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const invoice = await invoiceService.getInvoiceById(invoiceId, companyId);
        if (!invoice) {
            logger.warn(`InvoiceRoute: GET /invoices/${invoiceId} - Invoice not found`, { 
                requestId: requestId,
                invoiceId: invoiceId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: "Invoice not found" });
        }
        
        logger.info(`InvoiceRoute: GET /invoices/${invoiceId} - Request completed successfully`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            invoiceNumber: invoice.invoiceId,
            userId: req.auth?.id
        });
        res.json(invoice);
    } catch (error) {
        logger.error(`InvoiceRoute: GET /invoices/${invoiceId} - Request failed`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /invoices - Create new invoice
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`InvoiceRoute: POST /invoices - Request started`, { 
        requestId: requestId,
        invoiceId: req.body.invoiceId,
        compId: req.body.compId,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const invoice = await invoiceService.createInvoice(req.body, companyId, userId);
        logger.info(`InvoiceRoute: POST /invoices - Request completed successfully`, { 
            requestId: requestId,
            invoiceSeq: invoice.invoiceSeq,
            invoiceId: invoice.invoiceId,
            userId: req.auth?.id
        });
        res.status(201).json(invoice);
    } catch (error) {
        logger.error(`InvoiceRoute: POST /invoices - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /invoices/:id - Update invoice
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const invoiceId = req.params.id;
    
    logger.info(`InvoiceRoute: PUT /invoices/${invoiceId} - Request started`, { 
        requestId: requestId,
        invoiceId: invoiceId,
        updateFields: Object.keys(req.body),
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const invoice = await invoiceService.updateInvoice(invoiceId, req.body, companyId, userId);
        logger.info(`InvoiceRoute: PUT /invoices/${invoiceId} - Request completed successfully`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            invoiceNumber: invoice.invoiceId,
            userId: req.auth?.id
        });
        res.json(invoice);
    } catch (error) {
        if (error.message === "Invoice not found") {
            logger.warn(`InvoiceRoute: PUT /invoices/${invoiceId} - Invoice not found`, { 
                requestId: requestId,
                invoiceId: invoiceId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`InvoiceRoute: PUT /invoices/${invoiceId} - Request failed`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /invoices/:id - Delete invoice
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const invoiceId = req.params.id;
    
    logger.info(`InvoiceRoute: DELETE /invoices/${invoiceId} - Request started`, { 
        requestId: requestId,
        invoiceId: invoiceId,
        userId: req.auth?.id
    });
    
    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const userId = req.auth.getUserId();
        const result = await invoiceService.deleteInvoice(invoiceId, companyId, userId);
        logger.info(`InvoiceRoute: DELETE /invoices/${invoiceId} - Request completed successfully`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            userId: req.auth?.id
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Invoice not found") {
            logger.warn(`InvoiceRoute: DELETE /invoices/${invoiceId} - Invoice not found`, { 
                requestId: requestId,
                invoiceId: invoiceId,
                userId: req.auth?.id
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`InvoiceRoute: DELETE /invoices/${invoiceId} - Request failed`, { 
            requestId: requestId,
            invoiceId: invoiceId,
            error: error.message,
            userId: req.auth?.id,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
