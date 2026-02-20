const express = require("express");
const router = express.Router();
const productService = require("../services/product");
const authenticate = require("../middlewares/authenticate");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");

// GET /products - Get all products with pagination and search
router.get("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search = req.query.search || '';
    const sortBy = SortBy[`${req.query.sortBy || ''}`] || SortBy.SEQUENCE;
    const sortOrder = SortOrder[`${req.query.sortOrder || ''}`] || SortOrder.DESC;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`ProductRoute: GET /products - Request started`, { 
        requestId: requestId,
        page: page,
        itemsPerPage: itemsPerPage,
        search: search,
        companyId: companyId,
        userId: userId,
        userAgent: req.get('User-Agent'),
        ip: req.ip
    });
    
    try {
        const result = await productService.getAllProducts(page, itemsPerPage, search, companyId, userId, sortBy, sortOrder);
        logger.info(`ProductRoute: GET /products - Request completed successfully`, { 
            requestId: requestId,
            productCount: result.items.length,
            totalCount: result.paging.totalItems,
            page: page,
            search: search,
            companyId: companyId,
            userId: userId
        });
        res.json(result);
    } catch (error) {
        logger.error(`ProductRoute: GET /products - Request failed`, { 
            requestId: requestId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /products/:id - Get product by ID
router.get("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const productId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`ProductRoute: GET /products/${productId} - Request started`, { 
        requestId: requestId,
        productId: productId,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const product = await productService.getProductById(productId, companyId, userId);
        if (!product) {
            logger.warn(`ProductRoute: GET /products/${productId} - Product not found`, { 
                requestId: requestId,
                productId: productId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: "Product not found" });
        }
        
        logger.info(`ProductRoute: GET /products/${productId} - Request completed successfully`, { 
            requestId: requestId,
            productId: productId,
            productName: product.productName,
            companyId: companyId,
            userId: userId
        });
        res.json(product);
    } catch (error) {
        logger.error(`ProductRoute: GET /products/${productId} - Request failed`, { 
            requestId: requestId,
            productId: productId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /products - Create new product
router.post("/", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`ProductRoute: POST /products - Request started`, { 
        requestId: requestId,
        productName: req.body.productName,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const product = await productService.createProduct(req.body, companyId, userId);
        logger.info(`ProductRoute: POST /products - Request completed successfully`, { 
            requestId: requestId,
            productSeq: product.prodSequence,
            productId: product.productId,
            productName: product.productName,
            companyId: companyId,
            userId: userId
        });
        res.status(201).json(product);
    } catch (error) {
        logger.error(`ProductRoute: POST /products - Request failed`, { 
            requestId: requestId,
            error: error.message,
            requestBody: req.body,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /products/:id - Update product
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const productId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`ProductRoute: PUT /products/${productId} - Request started`, { 
        requestId: requestId,
        productId: productId,
        updateFields: Object.keys(req.body),
        companyId: companyId,
        userId: userId
    });
    
    try {
        const product = await productService.updateProduct(productId, req.body, companyId, userId);
        logger.info(`ProductRoute: PUT /products/${productId} - Request completed successfully`, { 
            requestId: requestId,
            productId: productId,
            productName: product.productName,
            companyId: companyId,
            userId: userId
        });
        res.json(product);
    } catch (error) {
        if (error.message === "Product not found") {
            logger.warn(`ProductRoute: PUT /products/${productId} - Product not found`, { 
                requestId: requestId,
                productId: productId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`ProductRoute: PUT /products/${productId} - Request failed`, { 
            requestId: requestId,
            productId: productId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /products/:id - Delete product
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const productId = req.params.id;
    const companyId = req.auth.getPrimaryCompanyId();
    const userId = req.auth.getUserId();
    
    logger.info(`ProductRoute: DELETE /products/${productId} - Request started`, { 
        requestId: requestId,
        productId: productId,
        companyId: companyId,
        userId: userId
    });
    
    try {
        const result = await productService.deleteProduct(productId, companyId, userId);
        logger.info(`ProductRoute: DELETE /products/${productId} - Request completed successfully`, { 
            requestId: requestId,
            productId: productId,
            companyId: companyId,
            userId: userId
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Product not found") {
            logger.warn(`ProductRoute: DELETE /products/${productId} - Product not found`, { 
                requestId: requestId,
                productId: productId,
                companyId: companyId,
                userId: userId
            });
            return res.status(404).json({ error: error.message });
        }
        logger.error(`ProductRoute: DELETE /products/${productId} - Request failed`, { 
            requestId: requestId,
            productId: productId,
            error: error.message,
            companyId: companyId,
            userId: userId,
            stack: error.stack
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
