# LLM Configuration Guide

## Environment Variables

### LLM Provider Selection
```bash
# Choose your LLM provider
LLM_PROVIDER=ollama          # Local development (default)
LLM_PROVIDER=openai          # OpenAI GPT models
LLM_PROVIDER=claude          # Anthropic Claude models
```

### Common Settings
```bash
LLM_TEMPERATURE=0.1          # Response creativity (0.0-1.0)
```

### Ollama (Local Development)
```bash
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```

### OpenAI (Production)
```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo   # or gpt-4, gpt-4-turbo
```

### Anthropic Claude (Production)
```bash
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

## Usage Examples

### Development
```bash
# Use local Ollama
export LLM_PROVIDER=ollama
npm start
```

### Production
```bash
# Use OpenAI
export LLM_PROVIDER=openai
export OPENAI_API_KEY=sk-your-key-here
npm start

# Use Claude
export LLM_PROVIDER=claude
export ANTHROPIC_API_KEY=sk-ant-your-key-here
npm start
```

## Model Recommendations

| Provider | Model | Use Case |
|---|---|---|
| Ollama | qwen2.5:7b | Local development, fast responses |
| OpenAI | gpt-3.5-turbo | Production, cost-effective |
| OpenAI | gpt-4-turbo | Production, highest quality |
| Anthropic | claude-3-sonnet | Production, balanced performance |
| Anthropic | claude-3-opus | Production, highest quality |
