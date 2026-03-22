const { Ollama, ChatOllama } = require('@langchain/ollama');
const { ChatOpenAI } = require('@langchain/openai');
const { ChatAnthropic } = require('@langchain/anthropic');
const logger = require('../config/logger');

class LLMFactory {
    static createLLM() {
        const provider = process.env.LLM_PROVIDER || 'ollama';
        
        switch (provider.toLowerCase()) {
            case 'openai':
                return new ChatOpenAI({
                    openAIApiKey: process.env.OPENAI_API_KEY,
                    modelName: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
                    temperature: parseFloat(process.env.LLM_TEMPERATURE) || 0.1
                });
                
            case 'claude':
            case 'anthropic':
                return new ChatAnthropic({
                    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
                    modelName: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
                    temperature: parseFloat(process.env.LLM_TEMPERATURE) || 0.1
                });
                
            case 'ollama':
            default:
                // Use ChatOllama for tool support
                return new ChatOllama({
                    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
                    model: process.env.OLLAMA_MODEL || 'qwen2.5:7b',
                    temperature: parseFloat(process.env.LLM_TEMPERATURE) || 0.1
                });
        }
    }
    
    static validateConfiguration() {
        const provider = process.env.LLM_PROVIDER || 'ollama';
        
        switch (provider.toLowerCase()) {
            case 'openai':
                if (!process.env.OPENAI_API_KEY) {
                    throw new Error('OPENAI_API_KEY is required for OpenAI provider');
                }
                break;
                
            case 'claude':
            case 'anthropic':
                if (!process.env.ANTHROPIC_API_KEY) {
                    throw new Error('ANTHROPIC_API_KEY is required for Anthropic provider');
                }
                break;
                
            case 'ollama':
                // Ollama doesn't require API key, just URL validation
                if (!process.env.OLLAMA_BASE_URL) {
                    logger.warn('OLLAMA_BASE_URL not set, using default: http://localhost:11434');
                }
                break;
                
            default:
                logger.warn(`Unknown LLM provider: ${provider}, falling back to Ollama`);
        }
    }

    /**
     * Extract content from LLM response handling different provider formats
     * @param {*} response - LLM response
     * @returns {string} - Extracted content
     */
    static extractContent(response) {
        if (typeof response === 'string') {
            return response.trim();
        }
        if (response?.content) {
            return response.content.trim();
        }
        if (response?.text) {
            return response.text.trim();
        }
        logger.warn('Unexpected LLM response format:', response);
        return '';
    }
}

module.exports = LLMFactory;
