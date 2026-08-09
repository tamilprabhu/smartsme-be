const { ChatOllama } = require('@langchain/ollama');
const { ChatOpenAI } = require('@langchain/openai');
const { ChatAnthropic } = require('@langchain/anthropic');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const logger = require('../config/logger');

/**
 * Singleton LLM instance cache.
 *
 * Key  : "<provider>:<model>" (e.g. "gemini:gemini-1.5-flash")
 * Value: the constructed LLM client instance
 *
 * Why a keyed cache instead of a single variable:
 * - The provider/model is resolved from env vars at first call.
 * - Tests or future multi-model scenarios may call getLLM() after
 *   changing env config; each unique combination gets its own singleton.
 *
 * IMPORTANT: bindTools() and withStructuredOutput() return NEW wrapper
 * objects wrapping the base instance — never cache those, only the base.
 */
const instanceCache = new Map();

class LLMFactory {
    /**
     * Returns a singleton LLM instance for the currently configured provider.
     * Constructs once on first call, returns the cached object on every
     * subsequent call with the same provider + model combination.
     */
    static getLLM() {
        const provider = (process.env.LLM_PROVIDER || 'ollama').toLowerCase();
        const model = LLMFactory._resolveModelName(provider);
        const cacheKey = `${provider}:${model}`;

        if (instanceCache.has(cacheKey)) {
            return instanceCache.get(cacheKey);
        }

        const instance = LLMFactory._construct(provider, model);
        instanceCache.set(cacheKey, instance);
        logger.info(`[LLMFactory] Created singleton LLM – provider: ${provider}, model: ${model}`);
        return instance;
    }

    /**
     * Resolve the model name for the given provider from env vars.
     * @param {string} provider
     * @returns {string}
     */
    static _resolveModelName(provider) {
        switch (provider) {
            case 'openai':
                return process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
            case 'claude':
            case 'anthropic':
                return process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229';
            case 'gemini':
            case 'google':
                return process.env.GEMINI_MODEL || 'gemini-1.5-flash';
            case 'ollama':
            default:
                return process.env.OLLAMA_MODEL || 'qwen2.5:7b';
        }
    }

    /**
     * Construct a fresh LLM client for the given provider + model.
     * Called only once per unique provider:model combination.
     * @param {string} provider
     * @param {string} model
     */
    static _construct(provider, model) {
        const temperature = parseFloat(process.env.LLM_TEMPERATURE) || 0.1;

        switch (provider) {
            case 'openai':
                return new ChatOpenAI({
                    openAIApiKey: process.env.OPENAI_API_KEY,
                    modelName: model,
                    temperature,
                });

            case 'claude':
            case 'anthropic':
                return new ChatAnthropic({
                    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
                    modelName: model,
                    temperature,
                });

            case 'gemini':
            case 'google':
                return new ChatGoogleGenerativeAI({
                    apiKey: process.env.GOOGLE_API_KEY,
                    model,
                    temperature,
                });

            case 'ollama':
            default:
                return new ChatOllama({
                    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
                    model,
                    temperature,
                });
        }
    }

    /**
     * Validate that required env vars are present for the configured provider.
     * Call once at application startup (e.g. in agentOrchestrator).
     */
    static validateConfiguration() {
        const provider = (process.env.LLM_PROVIDER || 'ollama').toLowerCase();

        switch (provider) {
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

            case 'gemini':
            case 'google':
                if (!process.env.GOOGLE_API_KEY) {
                    throw new Error('GOOGLE_API_KEY is required for Gemini provider');
                }
                break;

            case 'ollama':
                if (!process.env.OLLAMA_BASE_URL) {
                    logger.warn(
                        '[LLMFactory] OLLAMA_BASE_URL not set, using default: http://localhost:11434',
                    );
                }
                break;

            default:
                logger.warn(`[LLMFactory] Unknown provider: ${provider}, falling back to Ollama`);
        }
    }

    /**
     * Extract text content from an LLM response, normalising across providers.
     * @param {*} response
     * @returns {string}
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
        logger.warn('[LLMFactory] Unexpected LLM response format:', response);
        return '';
    }

    /**
     * Clear the singleton cache.
     * Useful in tests to force fresh construction with different env vars.
     */
    static _clearCache() {
        instanceCache.clear();
    }
}

module.exports = LLMFactory;
