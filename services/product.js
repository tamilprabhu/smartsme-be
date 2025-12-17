const { Product } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const productService = {
    // Get all products with pagination and search
    getAllProducts: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProductService: Fetching products - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            // Build search conditions
            const whereClause = search ? {
                [Op.or]: [
                    { prodName: { [Op.like]: `%${search}%` } },
                    { prodId: { [Op.like]: `%${search}%` } },
                    { rawMaterial: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['prodIdSeq', 'ASC']]
            });
            logger.info(`ProductService: Successfully retrieved ${rows.length} products out of ${count} total`);
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / validLimit),
                    itemsPerPage: validLimit,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error("ProductService: Failed to fetch products", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        logger.info(`ProductService: Fetching product with ID: ${id}`);
        try {
            const product = await Product.findByPk(id);
            if (product) {
                logger.info(`ProductService: Successfully retrieved product: ${product.prodName} (ID: ${id})`);
            } else {
                logger.warn(`ProductService: Product not found with ID: ${id}`);
            }
            return product;
        } catch (error) {
            logger.error(`ProductService: Failed to fetch product with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new product
    createProduct: async (productData) => {
        logger.info(`ProductService: Creating new product: ${productData.prodName}`, { 
            companyId: productData.companyId,
            prodId: productData.prodId 
        });
        try {
            const product = await Product.create(productData);
            logger.info(`ProductService: Successfully created product: ${product.prodName} (ID: ${product.prodIdSeq})`, {
                productId: product.prodIdSeq,
                companyId: product.companyId
            });
            return product;
        } catch (error) {
            logger.error(`ProductService: Failed to create product: ${productData.prodName}`, { 
                error: error.message, 
                productData: productData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        logger.info(`ProductService: Updating product with ID: ${id}`, { updateData: productData });
        try {
            const [updatedRows] = await Product.update(productData, {
                where: { prodIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`ProductService: No product found to update with ID: ${id}`);
                throw new Error("Product not found");
            }
            const updatedProduct = await Product.findByPk(id);
            logger.info(`ProductService: Successfully updated product: ${updatedProduct.prodName} (ID: ${id})`);
            return updatedProduct;
        } catch (error) {
            logger.error(`ProductService: Failed to update product with ID: ${id}`, { 
                error: error.message, 
                updateData: productData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        logger.info(`ProductService: Deleting product with ID: ${id}`);
        try {
            const product = await Product.findByPk(id);
            const deletedRows = await Product.destroy({
                where: { prodIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`ProductService: No product found to delete with ID: ${id}`);
                throw new Error("Product not found");
            }
            logger.info(`ProductService: Successfully deleted product: ${product?.prodName || 'Unknown'} (ID: ${id})`);
            return { message: "Product deleted successfully" };
        } catch (error) {
            logger.error(`ProductService: Failed to delete product with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = productService;
