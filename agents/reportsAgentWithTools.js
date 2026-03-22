const { HumanMessage, AIMessage } = require('@langchain/core/messages');
const logger = require('../config/logger');
const { productionReportTool } = require('../tools/productionTools');
const LLMFactory = require('../factories/llmFactory');

class ReportsAgentWithTools {
    constructor() {
        LLMFactory.validateConfiguration();
        this.llm = LLMFactory.createLLM();
        
        // Check if LLM supports tool binding
        if (!this.llm.bindTools) {
            logger.warn(`[ReportsAgent] LLM model ${process.env.OLLAMA_MODEL || 'unknown'} doesn't support tool binding. Consider using llama3.1:8b or newer for tool support.`);
            this.toolBoundLLM = null;
        } else {
            this.toolBoundLLM = this.llm.bindTools([productionReportTool]);
        }
        
        logger.info(`Reports Agent (Tools) initialized with LLM provider: ${process.env.LLM_PROVIDER || 'ollama'}`);
    }

    async processReportRequest(message, userContext) {
        try {
            logger.info(`[ReportsAgent] Processing: "${message}" for company: ${userContext.companyId}`);
            
            // If LLM doesn't support tools, use direct approach
            if (!this.toolBoundLLM) {
                return await this.handleDirectReport(message, userContext);
            }
            
            // Create messages with company context
            const systemMessage = `You are a manufacturing production reports assistant. 
            User company: ${userContext.companyId}
            User roles: ${userContext.roles?.join(', ') || 'unknown'}
            
            When users ask for production reports, use the production_report tool with the companyId.
            Extract product names and date ranges from user requests.
            
            Date parsing examples:
            - "since last Sunday" = calculate last Sunday's date
            - "last week" = 7 days ago to today
            - "this month" = first day of current month to today`;
            
            const messages = [
                new HumanMessage(`${systemMessage}\n\nUser request: ${message}`)
            ];

            // Let LLM decide if it needs to use tools
            const response = await this.toolBoundLLM.invoke(messages);
            
            // Check if LLM used tools
            if (response.tool_calls && response.tool_calls.length > 0) {
                logger.info(`[ReportsAgent] LLM used ${response.tool_calls.length} tool(s)`);
                
                // Execute tool calls
                const toolResults = [];
                for (const toolCall of response.tool_calls) {
                    if (toolCall.name === 'production_report') {
                        // Inject companyId into tool call
                        const toolArgs = {
                            ...toolCall.args,
                            companyId: userContext.companyId
                        };
                        
                        const result = await productionReportTool.invoke(toolArgs);
                        toolResults.push(result);
                    }
                }
                
                // Format results for user
                if (toolResults.length > 0) {
                    const reportData = JSON.parse(toolResults[0]);
                    if (reportData.error) {
                        return reportData.message;
                    }
                    return this.formatProductionReport(reportData, message);
                }
            }
            
            // Fallback to direct LLM response
            return LLMFactory.extractContent(response) || "I can help you generate production reports. What would you like to know?";
            
        } catch (error) {
            logger.error('Reports Agent (Tools) error:', error);
            throw new Error('Failed to process report request');
        }
    }

    async handleDirectReport(message, userContext) {
        // Fallback for LLMs without tool support - generate basic report
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7); // Last 7 days
            
            const result = await productionReportTool.invoke({ 
                companyId: userContext.companyId,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0]
            });
            
            const reportData = JSON.parse(result);
            if (reportData.error) {
                return reportData.message;
            }
            
            return this.formatProductionReport(reportData, message);
        } catch (error) {
            logger.error('Direct report error:', error);
            return "I can help you generate production reports, but encountered an error. Please try again.";
        }
    }

    formatProductionReport(reportData, originalMessage) {
        const { summary, dateRange, productFilter, shifts } = reportData;
        
        let report = `📊 **Production Report**\n\n`;
        
        if (productFilter) {
            report += `🎯 **Product**: ${productFilter}\n`;
        }
        
        report += `📅 **Period**: ${dateRange.startDate} to ${dateRange.endDate}\n\n`;
        
        report += `📈 **Summary**:\n`;
        report += `• Total Shifts: ${summary.totalShifts}\n`;
        report += `• Total Production: ${summary.totalProduction} units\n`;
        report += `• Total Rejection: ${summary.totalRejection} units\n`;
        report += `• Net Production: ${summary.totalNetProduction} units\n`;
        report += `• Rejection Rate: ${summary.rejectionRate}%\n\n`;
        
        if (shifts.length > 0 && shifts.length <= 10) {
            report += `📋 **Recent Shifts**:\n`;
            shifts.slice(0, 10).forEach((shift, i) => {
                const date = new Date(shift.date).toLocaleDateString();
                report += `${i + 1}. ${date} - Production: ${shift.production}, Rejection: ${shift.rejection}`;
                if (shift.supervisor) report += ` (${shift.supervisor})`;
                report += `\n`;
            });
        }
        
        return report;
    }
}

module.exports = new ReportsAgentWithTools();
