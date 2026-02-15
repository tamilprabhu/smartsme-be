const { Product } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");

const productService = {
    // Get all products with pagination and search
    getAllProducts: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId,
        userId,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProductService: Fetching products - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}, userId: ${userId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            // Build search conditions with company filtering
            const whereClause = {
                companyId: companyId,
                ...(search && {
                    [Op.or]: [
                        { productName: { [Op.like]: `%${search}%` } },
                        { productId: { [Op.like]: `%${search}%` } },
                        { rawMaterial: { [Op.like]: `%${search}%` } },
                        { salesType: { [Op.like]: `%${search}%` } },
                        { salesCode: { [Op.like]: `%${search}%` } }
                    ]
                })
            };
            
            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'product_seq')
            });
            logger.info(`ProductService: Successfully retrieved ${rows.length} products out of ${count} total for company ${companyId}`);
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
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id, companyId, userId) => {
        logger.info(`ProductService: Fetching product with ID: ${id} for company: ${companyId}, user: ${userId}`);
        try {
            const product = await Product.findOne({
                where: {
                    prodSequence: id,
                    companyId: companyId
                }
            });
            if (product) {
                logger.info(`ProductService: Successfully retrieved product: ${product.productName} (ID: ${id}) for company: ${companyId}`);
            } else {
                logger.warn(`ProductService: Product not found with ID: ${id} for company: ${companyId}`);
            }
            return product;
        } catch (error) {
            logger.error(`ProductService: Failed to fetch product with ID: ${id}`, { 
                error: error.message, 
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new product
    createProduct: async (productData, companyId, userId) => {
        logger.info(`ProductService: Creating new product: ${productData.productName} for company: ${companyId}, user: ${userId}`, { 
            productId: productData.productId 
        });
        try {
            const enrichedProductData = {
                ...productData,
                companyId: companyId,
                createDate: new Date(),
                updateDate: new Date()
            };
            const product = await Product.create(enrichedProductData);
            logger.info(`ProductService: Successfully created product: ${product.productName} (ID: ${product.prodSequence}) for company: ${companyId}`, {
                productId: product.prodSequence,
                companyId: product.companyId,
                userId: userId
            });
            return product;
        } catch (error) {
            logger.error(`ProductService: Failed to create product: ${productData.productName}`, { 
                error: error.message, 
                productData: productData,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Update product
    updateProduct: async (id, productData, companyId, userId) => {
        logger.info(`ProductService: Updating product with ID: ${id} for company: ${companyId}, user: ${userId}`, { updateData: productData });
        try {
            const enrichedProductData = {
                ...productData,
                updateDate: new Date()
            };
            const [updatedRows] = await Product.update(enrichedProductData, {
                where: { 
                    prodSequence: id,
                    companyId: companyId
                }
            });
            if (updatedRows === 0) {
                logger.warn(`ProductService: No product found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Product not found");
            }
            const updatedProduct = await Product.findOne({
                where: {
                    prodSequence: id,
                    companyId: companyId
                }
            });
            logger.info(`ProductService: Successfully updated product: ${updatedProduct.productName} (ID: ${id}) for company: ${companyId}`, {
                userId: userId
            });
            return updatedProduct;
        } catch (error) {
            logger.error(`ProductService: Failed to update product with ID: ${id}`, { 
                error: error.message, 
                updateData: productData,
                companyId: companyId,
                userId: userId,
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
            const [updatedRows] = await Product.update(
                { isDeleted: true, isActive: false },
                { where: { prodSequence: id, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`ProductService: No product found to delete with ID: ${id}`);
                throw new Error("Product not found");
            }
            logger.info(`ProductService: Successfully soft deleted product: ${product?.productName || 'Unknown'} (ID: ${id})`);
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
