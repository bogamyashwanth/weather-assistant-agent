# Weather Agent - Testing Guide

## Prerequisites

Before running the tests, you need to configure your environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```bash
   # Required for the agent to work
   GEMINI_API_KEY=your-gemini-api-key-here

   # Optional but recommended for observability
   LANGWATCH_API_KEY=your-langwatch-api-key-here
   ```

## Getting API Keys

### Google Gemini API Key (Required)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### LangWatch API Key (Optional but Recommended)
1. Go to [LangWatch](https://app.langwatch.ai)
2. Create an account or sign in
3. Navigate to Settings → API Keys
4. Create a new API key
5. Copy the key to your `.env` file

## Running Tests

Once your `.env` file is configured:

```bash
# Run all scenario tests
pnpm test:scenarios

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Understanding the Tests

The tests in `tests/scenarios/weather-agent.test.ts` demonstrate:

1. **Basic weather lookup** - Tests that the agent can fetch and present weather data
2. **Multi-turn conversations** - Tests context retention and natural conversation flow
3. **Error handling** - Tests how the agent handles unclear requests

Each test uses:
- **User Simulator**: AI-powered user that generates realistic messages
- **Judge Agent**: Evaluates the conversation against success criteria
- **Deterministic Assertions**: Verifies the test outcome

## Viewing Results

After running tests, you can view detailed simulation results in the [LangWatch Dashboard](https://app.langwatch.ai/@project/simulations):
- See full conversation flows
- Debug tool calls
- Analyze agent decisions
- Share results with your team

## Troubleshooting

**Tests timeout**: Increase the timeout in `vitest.config.ts` if needed (default is 60 seconds)

**API key errors**: Make sure your `.env` file has valid API keys

**Network errors**: The weather tool uses the Open-Meteo API which requires internet access

## Next Steps

After successfully running tests:
1. Try modifying the judge criteria to test different behaviors
2. Add new scenarios for edge cases
3. Experiment with different conversation flows
4. View the simulation results in LangWatch Dashboard
