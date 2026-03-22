const { tool } = require('@langchain/core/tools');
const { z } = require('zod');
const productionShiftRepository = require('../repositories/productionShiftRepository');
const logger = require('../config/logger');

const productionReportTool = tool(
  async ({ companyId, productId, startDate, endDate }) => {
    try {
      const start = startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Default: 7 days ago
      const end = endDate ? new Date(endDate) : new Date(); // Default: now
      
      const productionData = await productionShiftRepository.getProductionSummary(
        companyId, 
        start, 
        end
      );
      
      // Filter by product if specified
      let filteredData = productionData;
      if (productId) {
        filteredData = productionData.filter(shift => 
          shift.productId === productId ||
          shift.Product?.productId === productId ||
          shift.Product?.productName?.toLowerCase().includes(productId.toLowerCase())
        );
      }
      
      if (filteredData.length === 0) {
        return JSON.stringify({
          error: true,
          message: productId 
            ? `No production data found for product "${productId}" in the specified period.`
            : "No production data found in the specified period."
        });
      }
      
      const totalProduction = filteredData.reduce((sum, shift) => sum + (shift.production || 0), 0);
      const totalRejection = filteredData.reduce((sum, shift) => sum + (shift.rejection || 0), 0);
      const totalNetProduction = filteredData.reduce((sum, shift) => sum + (shift.netProduction || 0), 0);
      
      return JSON.stringify({
        error: false,
        productFilter: productId || null,
        dateRange: {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0]
        },
        summary: {
          totalShifts: filteredData.length,
          totalProduction,
          totalRejection,
          totalNetProduction,
          rejectionRate: totalProduction > 0 ? ((totalRejection / totalProduction) * 100).toFixed(2) : 0
        },
        shifts: filteredData.map(shift => ({
          date: shift.createdAt,
          production: shift.production,
          rejection: shift.rejection,
          netProduction: shift.netProduction,
          supervisor: shift.supervisor,
          productName: shift.Product?.productName
        }))
      });
      
    } catch (error) {
      logger.error('Production report tool error:', error);
      return JSON.stringify({
        error: true,
        message: "Error generating production report. Please try again."
      });
    }
  },
  {
    name: "production_report",
    description: "Generate production report for a specific product or all products within a date range",
    schema: z.object({
      companyId: z.string().describe("Company ID for tenant isolation"),
      productId: z.string().optional().describe("Product name or ID to filter by (optional)"),
      startDate: z.string().optional().describe("Start date in YYYY-MM-DD format (optional, defaults to 7 days ago)"),
      endDate: z.string().optional().describe("End date in YYYY-MM-DD format (optional, defaults to today)")
    })
  }
);

module.exports = { productionReportTool };
