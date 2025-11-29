# Quick Start Guide

## Setup (5 minutes)

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   - `GEMINI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - `LANGWATCH_API_KEY` - Get from [LangWatch Dashboard](https://app.langwatch.ai) (optional but recommended)

3. **Start the dev server:**
   ```bash
   pnpm dev
   ```
   
   The Mastra UI will open at `http://localhost:4111`

## Try the Agent

In the Mastra UI, you can:
- Ask about weather in any city: "What's the weather in Tokyo?"
- Get activity suggestions: "I'm in London, what outdoor activities do you recommend?"
- Multi-turn conversations: Ask follow-up questions about weather details

## Run Tests

```bash
# Run scenario tests
pnpm test:scenarios

# Run all tests
pnpm test
```

Tests use AI-powered simulation to validate agent behavior across multiple scenarios.

## View Observability

Visit [LangWatch Dashboard](https://app.langwatch.ai) to see:
- All agent interactions
- Tool calls and decisions
- Performance metrics
- Test simulation results

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [TESTING.md](./TESTING.md) for testing guide
- Review [AGENTS.md](./AGENTS.md) for development guidelines
- Explore the code in `src/mastra/` to understand the architecture

---

Built with [Mastra](https://mastra.ai) + [LangWatch](https://langwatch.ai)
