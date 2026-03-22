const { tool } = require('@langchain/core/tools');
const { z } = require('zod');
const productRepository = require('../repositories/productRepository');
const logger = require('../config/logger');

const searchProductsTool = tool(
  async ({ companyId, productName, rawMaterial, salesType, weightMin, weightMax }) => {
    try {
      const searchCriteria = {};
      
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
      
      return JSON.stringify(products.map(p => ({
        name: p.productName,
        material: p.rawMaterial,
        weight: p.weight,
        rate: p.perItemRate
      })));
    } catch (error) {
      logger.error('Search products tool error:', error);
      return "Error searching products. Please try again.";
    }
  },
  {
    name: "search_products",
    description: "Search and list products from the company catalog. Use empty parameters to list all products.",
    schema: z.object({
      companyId: z.string().describe("Company ID for tenant isolation"),
      productName: z.string().optional().describe("Product name to search for"),
      rawMaterial: z.string().optional().describe("Raw material type"),
      salesType: z.string().optional().describe("Sales category/type"),
      weightMin: z.number().optional().describe("Minimum weight"),
      weightMax: z.number().optional().describe("Maximum weight")
    })
  }
);

module.exports = { searchProductsTool };
