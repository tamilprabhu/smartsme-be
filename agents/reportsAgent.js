const { StateGraph, END } = require('@langchain/langgraph');
const { BaseMessage, HumanMessage, AIMessage } = require('@langchain/core/messages');
const { PromptTemplate } = require('@langchain/core/prompts');
const logger = require('../config/logger');
const productionShiftRepository = require('../repositories/productionShiftRepository');
const { AGENT_PROMPTS } = require('../constants/agentPrompts');
const LLMFactory = require('../factories/llmFactory');

class ReportsAgent {
    constructor() {
        LLMFactory.validateConfiguration();
        this.llm = LLMFactory.createLLM();
        this.graph = this.createGraph();
        logger.info(`Reports Agent initialized with LLM provider: ${process.env.LLM_PROVIDER || 'ollama'}`);
    }

    createGraph() {
        const workflow = new StateGraph({
            channels: {
                messages: {
                    value: (x, y) => x.concat(y),
                    default: () => []
                },
                userContext: {
                    value: (x, y) => y ?? x,
                    default: () => ({})
                },
                reportType: {
                    value: (x, y) => y ?? x,
                    default: () => null
                },
                reportData: {
                    value: (x, y) => y ?? x,
                    default: () => null
                }
            }
        });

        workflow.addNode('classify_request', this.classifyRequest.bind(this));
        workflow.addNode('generate_production_report', this.generateProductionReport.bind(this));
        workflow.addNode('handle_general_request', this.handleGeneralRequest.bind(this));

        workflow.setEntryPoint('classify_request');
        
        workflow.addConditionalEdges(
            'classify_request',
            this.routeRequest.bind(this),
            {
                'production_report': 'generate_production_report',
                'general_help': 'handle_general_request'
            }
        );

        workflow.addEdge('generate_production_report', END);
        workflow.addEdge('handle_general_request', END);

        return workflow.compile();
    }

    async classifyRequest(state) {
        const lastMessage = state.messages[state.messages.length - 1];
        const { userContext } = state;
        
        try {
            const prompt = await PromptTemplate.fromTemplate(AGENT_PROMPTS.CLASSIFICATION).format({
                roles: userContext.roles?.join(', ') || 'unknown',
                companyId: userContext.companyId || 'unknown',
                message: lastMessage.content
            });

            const response = await this.llm.invoke(prompt);
            logger.info('LLM Classification Response content:', response);
            
            const reportType = response?.trim()?.toLowerCase();
            logger.info(`Parsed reportType: "${reportType}"`);
            
            return {
                ...state,
                reportType: reportType === 'production_report' ? 'production_report' : 'general_help'
            };
        } catch (error) {
            logger.error('Classification error:', error);
            return {
                ...state,
                reportType: 'general_help'
            };
        }
    }

    routeRequest(state) {
        return state.reportType || 'general_help';
    }

    async generateProductionReport(state) {
        try {
            const { userContext, messages } = state;
            const userMessage = messages[messages.length - 1].content;
            const companyId = userContext.companyId;
            
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            
            const productionData = await productionShiftRepository.getProductionSummary(
                companyId, 
                startDate, 
                endDate
            );
            
            // Let LLM generate tailored response with the data
            const response = await this.formatProductionReportWithLLM(productionData, userContext, userMessage);
            
            return {
                ...state,
                messages: [...state.messages, new AIMessage({ content: response })]
            };
        } catch (error) {
            logger.error('Error generating production report:', error);
            return {
                ...state,
                messages: [...state.messages, new AIMessage({ content: "I encountered an error retrieving production data. Please try again." })]
            };
        }
    }

    async handleGeneralRequest(state) {
        try {
            const { userContext, messages } = state;
            const userMessage = messages[messages.length - 1].content;
            
            const prompt = await PromptTemplate.fromTemplate(AGENT_PROMPTS.GENERAL_HELP).format({ 
                message: userMessage,
                roles: userContext.roles?.join(', ') || 'user',
                companyId: userContext.companyId || 'unknown'
            });
            
            const llmResponse = await this.llm.invoke([new HumanMessage(prompt)]);
            logger.info('LLM General Help Response:', llmResponse);
            
            const response = llmResponse?.content || "Hello! I can help you with production reports and manufacturing insights.";
            
            return {
                ...state,
                messages: [...state.messages, new AIMessage({ content: response })]
            };
        } catch (error) {
            logger.error('General request error:', error);
            return {
                ...state,
                messages: [...state.messages, new AIMessage({ content: "Hello! I can help you with production reports and manufacturing analytics. What would you like to know?" })]
            };
        }
    }

    async formatProductionReportWithLLM(data, userContext, userMessage) {
        if (!data || data.length === 0) {
            return `No production data found for your company in the last 30 days.`;
        }

        const totalProduction = data.reduce((sum, shift) => sum + (shift.production || 0), 0);
        const totalRejection = data.reduce((sum, shift) => sum + (shift.rejection || 0), 0);
        const totalNetProduction = data.reduce((sum, shift) => sum + (shift.netProduction || 0), 0);
        const totalShifts = data.length;
        
        const prompt = await PromptTemplate.fromTemplate(AGENT_PROMPTS.PRODUCTION_REPORT).format({
            totalShifts,
            totalProduction,
            totalRejection,
            totalNetProduction,
            roles: userContext.roles?.join(', ') || 'user',
            companyId: userContext.companyId || 'unknown',
            userMessage
        });

        const response = await this.llm.invoke([new HumanMessage(prompt)]);
        return response.content;
    }

    async processReportRequest(message, userContext) {
        try {
            const initialState = {
                messages: [new HumanMessage(message)],
                userContext
            };

            const result = await this.graph.invoke(initialState);
            const lastMessage = result.messages[result.messages.length - 1];
            
            return lastMessage.content;
        } catch (error) {
            logger.error('Reports Agent error:', error);
            throw new Error('Failed to process report request');
        }
    }
}

module.exports = new ReportsAgent();
