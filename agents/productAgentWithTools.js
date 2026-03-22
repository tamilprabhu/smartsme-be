const { HumanMessage, AIMessage } = require('@langchain/core/messages');
const logger = require('../config/logger');
const { searchProductsTool } = require('../tools/productTools');
const LLMFactory = require('../factories/llmFactory');

class ProductAgentWithTools {
    constructor() {
        LLMFactory.validateConfiguration();
        this.llm = LLMFactory.createLLM();
        
        // Check if LLM supports tool binding
        if (!this.llm.bindTools) {
            logger.warn(`[ProductAgent] LLM model ${process.env.OLLAMA_MODEL || 'unknown'} doesn't support tool binding. Consider using llama3.1:8b or newer for tool support.`);
            this.toolBoundLLM = null;
        } else {
            this.toolBoundLLM = this.llm.bindTools([searchProductsTool]);
        }
        
        logger.info(`Product Agent (Tools) initialized with LLM provider: ${process.env.LLM_PROVIDER || 'ollama'}`);
    }

    async processProductRequest(message, userContext) {
        try {
            logger.info(`[ProductAgent] Processing: "${message}" for company: ${userContext.companyId}`);
            
            // If LLM doesn't support tools, use direct approach
            if (!this.toolBoundLLM) {
                return await this.handleDirectSearch(message, userContext);
            }
            
            // Create messages with company context
            const systemMessage = `You are a manufacturing product assistant. 
            User company: ${userContext.companyId}
            User roles: ${userContext.roles?.join(', ') || 'unknown'}
            
            When users ask for products, use the search_products tool with the companyId.
            For "list all products" or similar requests, call search_products with just the companyId.`;
            
            const messages = [
                new HumanMessage(`${systemMessage}\n\nUser request: ${message}`)
            ];

            // Let LLM decide if it needs to use tools
            const response = await this.toolBoundLLM.invoke(messages);
            
            // Check if LLM used tools
            if (response.tool_calls && response.tool_calls.length > 0) {
                logger.info(`[ProductAgent] LLM used ${response.tool_calls.length} tool(s)`);
                
                // Execute tool calls
                const toolResults = [];
                for (const toolCall of response.tool_calls) {
                    if (toolCall.name === 'search_products') {
                        // Inject companyId into tool call
                        const toolArgs = {
                            ...toolCall.args,
                            companyId: userContext.companyId
                        };
                        
                        const result = await searchProductsTool.invoke(toolArgs);
                        toolResults.push(result);
                    }
                }
                
                // Format results for user
                if (toolResults.length > 0) {
                    const products = JSON.parse(toolResults[0]);
                    if (Array.isArray(products)) {
                        return this.formatProductList(products, message);
                    }
                    return toolResults[0]; // Error message
                }
            }
            
            // Fallback to direct LLM response
            return LLMFactory.extractContent(response) || "I can help you search for products. What are you looking for?";
            
        } catch (error) {
            logger.error('Product Agent (Tools) error:', error);
            throw new Error('Failed to process product request');
        }
    }

    async handleDirectSearch(message, userContext) {
        // Fallback for LLMs without tool support - search all products
        try {
            const products = await searchProductsTool.invoke({ companyId: userContext.companyId });
            const productList = JSON.parse(products);
            
            if (Array.isArray(productList)) {
                return this.formatProductList(productList, message);
            }
            return products; // Error message
        } catch (error) {
            logger.error('Direct search error:', error);
            return "I can help you search for products, but encountered an error. Please try again.";
        }
    }

    formatProductList(products, originalMessage) {
        if (products.length === 0) {
            return "No products found in your catalog.";
        }

        const isNameOnly = originalMessage.toLowerCase().includes('only name') || 
                          originalMessage.toLowerCase().includes('just name');

        if (isNameOnly) {
            const names = products.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
            return `📦 **Product Names** (${products.length} total):\n\n${names}`;
        }

        // Full product details
        let result = `📦 **Found ${products.length} Products:**\n\n`;
        products.forEach((p, i) => {
            result += `${i + 1}. **${p.name}**\n`;
            if (p.material) result += `   • Material: ${p.material}\n`;
            if (p.weight) result += `   • Weight: ${p.weight} kg\n`;
            if (p.rate) result += `   • Rate: ₹${p.rate}\n`;
            result += '\n';
        });

        return result;
    }
}

module.exports = new ProductAgentWithTools();
