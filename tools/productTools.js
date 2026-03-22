const { tool } = require('@langchain/core/tools');
const { z } = require('zod');
const productRepository = require('../repositories/productRepository');
const logger = require('../config/logger');

const searchProductsTool = tool(
  async ({ companyId, productName, rawMaterial, salesType, weightMin, weightMax, limit, fields }) => {
    try {
      const searchCriteria = {};
      const parsedLimit = limit ? Number.parseInt(limit, 10) : null;
      
      if (productName) searchCriteria.productName = productName;
      if (rawMaterial) searchCriteria.rawMaterial = rawMaterial;
      if (salesType) searchCriteria.salesType = salesType;
      if (weightMin || weightMax) {
        searchCriteria.weightRange = {};
        if (weightMin) searchCriteria.weightRange.min = weightMin;
        if (weightMax) searchCriteria.weightRange.max = weightMax;
      }
      
      const products = await productRepository.searchProducts(companyId, searchCriteria);
      
      if (products.length === 0) {
        return "No products found matching your criteria.";
      }

      const normalizedFields = (fields || '')
        .split(',')
        .map(field => field.trim().toLowerCase())
        .filter(Boolean);

      const fieldMap = {
        productid: 'productId',
        id: 'productId',
        name: 'name',
        productname: 'name',
        material: 'material',
        rawmaterial: 'material',
        weight: 'weight',
        rate: 'rate',
        salestype: 'salesType',
        cavity: 'cavity',
        shotrate: 'shotRate'
      };

      const selectedFields = normalizedFields
        .map(field => fieldMap[field])
        .filter(Boolean);

      const normalizedProducts = products.map(p => ({
        productId: p.productId,
        name: p.productName,
        material: p.rawMaterial,
        weight: p.weight,
        rate: p.perItemRate,
        salesType: p.salesType,
        cavity: p.cavity,
        shotRate: p.shotRate
      }));

      const limitedProducts = Number.isInteger(parsedLimit) && parsedLimit > 0
        ? normalizedProducts.slice(0, parsedLimit)
        : normalizedProducts;

      if (selectedFields.length === 0) {
        return JSON.stringify(limitedProducts);
      }

      return JSON.stringify(
        limitedProducts.map(product => {
          const filteredProduct = {};
          selectedFields.forEach(field => {
            filteredProduct[field] = product[field];
          });
          return filteredProduct;
        })
      );
    } catch (error) {
      logger.error('Search products tool error:', error);
      return "Error searching products. Please try again.";
    }
  },
  {
    name: "search_products",
    description: "Search and list products from the company catalog. Supports limiting results and selecting output fields like name or productId.",
    schema: z.object({
      companyId: z.string().describe("Company ID for tenant isolation"),
      productName: z.string().nullable().optional().describe("Product name to search for"),
      rawMaterial: z.string().nullable().optional().describe("Raw material type"),
      salesType: z.string().nullable().optional().describe("Sales category/type"),
      weightMin: z.number().nullable().optional().describe("Minimum weight"),
      weightMax: z.number().nullable().optional().describe("Maximum weight"),
      limit: z.string().nullable().optional().describe("Maximum number of products to return, string for example \"5\""),
      fields: z.string().nullable().optional().describe("Comma-separated fields to include in the output, for example: name,productId")
    })
  }
);

module.exports = { searchProductsTool };
