const logger = require('../config/logger');
const reportsAgent = require('../agents/reportsAgentWithTools'); // Use tool-based agent
const productAgent = require('../agents/productAgentWithTools'); // Use tool-based agent
const LLMFactory = require('../factories/llmFactory');
const { PromptTemplate } = require('@langchain/core/prompts');
const { HumanMessage } = require('@langchain/core/messages');

class AgentOrchestrator {
    constructor() {
        LLMFactory.validateConfiguration();
        this.orchestratorLLM = LLMFactory.createLLM();
        
        this.agents = {
            reports: reportsAgent,
            products: productAgent
        };
        
        logger.info(`Agent Orchestrator initialized with ${Object.keys(this.agents).length} agents`);
    }

    async processRequest(message, userContext) {
        const startTime = Date.now();
        logger.info(`[Orchestrator] Processing request - User: ${userContext.username || 'unknown'}, Company: ${userContext.companyId}, Message: "${message.substring(0, 100)}..."`);
        
        try {
            // Determine which agent(s) to use
            const agentSelection = await this.selectAgent(message, userContext);
            logger.info(`[Orchestrator] Agent selected: ${agentSelection.agent} (confidence: ${agentSelection.confidence})`);
            
            let response;
            // Route to appropriate agent
            switch (agentSelection.agent) {
                case 'reports':
                    logger.debug(`[Orchestrator] Routing to ReportsAgent`);
                    response = await this.agents.reports.processReportRequest(message, userContext);
                    break;
                    
                case 'products':
                    logger.debug(`[Orchestrator] Routing to ProductAgent`);
                    response = await this.agents.products.processProductRequest(message, userContext);
                    break;
                    
                default:
                    logger.debug(`[Orchestrator] Handling as general request`);
                    response = await this.handleGeneralRequest(message, userContext);
            }
            
            const duration = Date.now() - startTime;
            logger.info(`[Orchestrator] Request completed in ${duration}ms - Agent: ${agentSelection.agent}, Response length: ${response?.length || 0} chars`);
            
            return response;
        } catch (error) {
            const duration = Date.now() - startTime;
            logger.error(`[Orchestrator] Request failed after ${duration}ms:`, error);
            throw new Error('Failed to process request');
        }
    }

    async selectAgent(message, userContext) {
        try {
            const prompt = await PromptTemplate.fromTemplate(`
You are an AI agent orchestrator for a manufacturing system. Analyze the user's request and select the best agent.

Available agents:
- reports: Production reports, analytics, performance metrics, shift data
- products: Product search, specifications, catalog browsing, material info
- general: For greetings, help requests, or unclear intents

User context: Role: {roles}, Company: {companyId}
User message: {message}

Respond with ONLY the agent name that best matches their request.
If the request involves production data or analytics, use "reports".
If the request involves finding or searching products, use "products".
For anything else, use "general".`).format({
                roles: userContext.roles?.join(', ') || 'unknown',
                companyId: userContext.companyId || 'unknown',
                message: message
            });

            const response = await this.orchestratorLLM.invoke([new HumanMessage(prompt)]);
            
            // Handle different response formats - Ollama returns direct string
            const agentName = LLMFactory.extractContent(response).toLowerCase() || 'general';
            
            logger.info(`Agent selection: "${agentName}" for message: "${message.substring(0, 50)}..."`);
            
            return {
                agent: agentName,
                confidence: 1.0 // Could implement confidence scoring
            };
        } catch (error) {
            logger.error('Agent selection error:', error);
            return { agent: 'general', confidence: 0.5 };
        }
    }

    async handleGeneralRequest(message, userContext) {
        try {
            const prompt = await PromptTemplate.fromTemplate(`
You are a manufacturing AI assistant for SmartSME. The user said: "{message}"

User context: Role: {roles}, Company ID: {companyId}

Available capabilities:
- Production reports and analytics (shift data, efficiency metrics)
- Product search and specifications (catalog browsing, material info)

Respond naturally and helpfully. If they're asking what you can do, explain your capabilities.
Keep responses conversational and tailored to their specific message.`).format({
                message: message,
                roles: userContext.roles?.join(', ') || 'user',
                companyId: userContext.companyId || 'unknown'
            });
            
            const response = await this.orchestratorLLM.invoke([new HumanMessage(prompt)]);
            return LLMFactory.extractContent(response) || "Hello! I can help you with production reports and product information. What would you like to know?";
        } catch (error) {
            logger.error('General request error:', error);
            return "Hello! I can help you with production analytics and product search. How can I assist you today?";
        }
    }

    // Future: Multi-agent workflows
    async executeWorkflow(steps, userContext) {
        const results = [];
        
        for (const step of steps) {
            const result = await this.agents[step.agent].processRequest(step.message, userContext);
            results.push({ agent: step.agent, result });
        }
        
        return results;
    }
}

module.exports = new AgentOrchestrator();
