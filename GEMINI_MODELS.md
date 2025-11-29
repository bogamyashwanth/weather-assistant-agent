# Available Google Gemini Models

This document lists all available Google Gemini models you can use with this project.

## Current Configuration

**Active Model**: `gemini-2.0-flash-exp` (Gemini 2.0 Flash - Experimental)

## Available Models

### Latest Generation (Gemini 2.0)

#### 🚀 Gemini 2.0 Flash (Experimental) - **CURRENT**
```yaml
model: google/gemini-2.0-flash-exp
```
- **Status**: Experimental (latest)
- **Speed**: ⚡⚡⚡ Very Fast
- **Capability**: High
- **Context**: Up to 1M tokens
- **Features**: Native multimodal, improved tool calling
- **Best for**: Most use cases, especially agents with tools

### Stable Generation (Gemini 1.5)

#### 🧠 Gemini 1.5 Pro
```yaml
model: google/gemini-1.5-pro-latest
```
or version-pinned:
```yaml
model: google/gemini-1.5-pro-002
```
- **Status**: Stable
- **Speed**: ⚡⚡ Fast
- **Capability**: Highest
- **Context**: Up to 2M tokens
- **Best for**: Complex reasoning, long context

#### ⚡ Gemini 1.5 Flash
```yaml
model: google/gemini-1.5-flash-latest
```
or version-pinned:
```yaml
model: google/gemini-1.5-flash-002
```
- **Status**: Stable
- **Speed**: ⚡⚡⚡ Very Fast
- **Capability**: Good
- **Context**: Up to 1M tokens
- **Best for**: Fast responses, high throughput

#### 💨 Gemini 1.5 Flash-8B
```yaml
model: google/gemini-1.5-flash-8b-latest
```
- **Status**: Stable
- **Speed**: ⚡⚡⚡⚡ Extremely Fast
- **Capability**: Moderate
- **Context**: Up to 1M tokens
- **Best for**: Simple tasks, maximum speed

### Experimental Preview Models

#### 🔬 Gemini Experimental (December 2024)
```yaml
model: google/gemini-exp-1206
```
- **Status**: Experimental preview
- **Features**: Latest experimental features
- **Note**: May change without notice

#### 🔬 Gemini Experimental (November 2024)
```yaml
model: google/gemini-exp-1121
```
- **Status**: Experimental preview
- **Features**: Previous experimental version

## How to Change Models

### Method 1: Update Prompt File (Recommended)

Edit `prompts/weather-assistant.prompt.yaml`:

```yaml
model: google/gemini-2.0-flash-exp
modelParameters:
  temperature: 0.7
messages:
  - role: system
    content: |
      Your prompt here...
```

Then sync to LangWatch:
```bash
pnpm prompt:sync
```

### Method 2: Direct in Code

Edit `src/mastra/agents/weather-agent.ts`:

```typescript
model: 'gemini-1.5-pro-002', // Change this line
```

### Method 3: Update Test Configuration

Edit `scenario.config.mjs`:

```javascript
export default defineConfig({
  defaultModel: {
    model: google('gemini-1.5-pro-latest'),
  },
});
```

## Model Comparison

| Model | Speed | Intelligence | Cost | Context | Best Use Case |
|-------|-------|--------------|------|---------|---------------|
| gemini-2.0-flash-exp | ⚡⚡⚡ | 🧠🧠🧠 | 💰 | 1M | **General purpose** (current) |
| gemini-1.5-pro | ⚡⚡ | 🧠🧠🧠🧠 | 💰💰💰 | 2M | Complex reasoning |
| gemini-1.5-flash | ⚡⚡⚡ | 🧠🧠🧠 | 💰 | 1M | Fast & capable |
| gemini-1.5-flash-8b | ⚡⚡⚡⚡ | 🧠🧠 | 💰 | 1M | Maximum speed |
| gemini-exp-* | ⚡⚡⚡ | 🧠🧠🧠🧠 | 💰 | Varies | Experimental features |

## Important Notes

### ⚠️ Non-Existent Models

The following model names **do NOT exist**:
- ❌ `gemini-3.0-pro` - Not released
- ❌ `gemini-2.5-pro` - Not released
- ❌ `gemini-2.0-pro` - Use `gemini-2.0-flash-exp` instead

### Model Naming Convention

Google Gemini models follow this pattern:
```
google/gemini-<version>-<size>-<variant>
```

Examples:
- `google/gemini-1.5-pro-latest` ✅
- `google/gemini-2.0-flash-exp` ✅
- `google/gemini-1.5-flash-002` ✅

### Latest Suffix

Models with `-latest` suffix automatically use the newest stable version:
- `gemini-1.5-pro-latest` → Currently points to `gemini-1.5-pro-002`
- `gemini-1.5-flash-latest` → Currently points to `gemini-1.5-flash-002`

For production, consider using version-pinned models (e.g., `-002`) to avoid unexpected changes.

## Pricing (as of Dec 2024)

### Free Tier
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

All models are available in the free tier!

### Paid Tier
Pricing varies by model. Check [Google AI Pricing](https://ai.google.dev/pricing) for details.

## Model Features

### All Models Support:
- ✅ Function/Tool calling
- ✅ Streaming responses
- ✅ System instructions
- ✅ Safety settings
- ✅ JSON mode
- ✅ Code execution (where applicable)

### Gemini 2.0+ Adds:
- ✅ Improved tool calling
- ✅ Native multimodal (text, images, audio, video)
- ✅ Better reasoning
- ✅ Faster inference

## Recommended Setup

### Development
```yaml
model: google/gemini-2.0-flash-exp
```
Use latest experimental for development to get newest features.

### Production
```yaml
model: google/gemini-1.5-flash-002
```
Use stable, version-pinned models for production reliability.

### Testing
```yaml
model: google/gemini-1.5-flash-8b-latest
```
Use fastest model for rapid testing iterations.

## Resources

- [Google AI Studio](https://aistudio.google.com/app/apikey) - Get API key
- [Model Documentation](https://ai.google.dev/gemini-api/docs/models) - Official docs
- [Pricing](https://ai.google.dev/pricing) - Current pricing
- [AI SDK Google Provider](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai) - Implementation guide

---

**Current Model**: Using `gemini-2.0-flash-exp` for the best balance of speed, capability, and latest features. 🚀
