# Mastra Weather Agent 🌤️

> Production-ready AI weather assistant built with Mastra, following LangWatch best practices

A fully-featured weather assistant agent demonstrating best practices for production AI development, including:
- ✅ Prompt management with LangWatch Prompt CLI
- ✅ Comprehensive testing with Scenario simulation framework
- ✅ Full observability and tracing with LangWatch
- ✅ Memory and context management with Mastra
- ✅ Production-ready architecture

## Features

- **Real-time Weather Data**: Get current weather for any location worldwide using Open-Meteo API
- **Activity Planning**: Receive activity suggestions based on current weather conditions
- **Conversation Memory**: Multi-turn conversations with full context retention
- **Production Testing**: Simulation-based testing with AI-powered user simulators
- **Prompt Versioning**: All prompts managed as code with LangWatch CLI
- **Full Observability**: Complete tracing and monitoring with LangWatch integration

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Google Gemini API key
- LangWatch API key (optional but recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-directory>

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env and add your API keys:
# GEMINI_API_KEY=your_key_here
# LANGWATCH_API_KEY=your_key_here
```

### Running the Agent

```bash
# Start the development server with UI
pnpm dev

# Or run the CLI version
pnpm start
```

The Mastra dev server will start at `http://localhost:4111` where you can interact with your agent through the web UI.

## Project Structure

```
.
├── src/
│   ├── mastra/
│   │   ├── agents/
│   │   │   └── weather-agent.ts      # Main weather agent
│   │   ├── tools/
│   │   │   └── weather-tool.ts       # Weather API tool
│   │   └── index.ts                  # Mastra configuration
│   └── index.ts                      # CLI entry point
├── prompts/
│   └── weather-assistant.prompt.yaml # Versioned agent prompt
├── tests/
│   ├── scenarios/
│   │   └── weather-agent.test.ts     # Scenario tests
│   └── setup.ts                      # Test configuration
├── prompts.json                       # Prompt dependencies
├── prompts-lock.json                  # Locked prompt versions
└── AGENTS.md                          # Development guidelines
```

## Development Workflow

### 1. Prompt Management

All agent prompts are managed with LangWatch CLI:

```bash
# Create a new prompt
pnpm prompt:create my-prompt

# Edit prompts in prompts/ directory
# Then sync to LangWatch platform
pnpm prompt:sync

# List all prompts
pnpm prompt:list
```

Prompts are stored as YAML files in the `prompts/` directory and version controlled with Git.

### 2. Testing

This project uses Scenario for simulation-based testing:

```bash
# Run all tests
pnpm test

# Run only scenario tests
pnpm test:scenarios

# Watch mode for development
pnpm test:watch
```

**Writing Tests:**

See `tests/scenarios/weather-agent.test.ts` for examples. Scenario tests use:
- **User Simulator**: AI-powered user that simulates realistic conversations
- **Judge Agent**: Evaluates conversations against defined criteria
- **Script**: Controls the conversation flow

### 3. Observability

View your agent's traces and metrics in the [LangWatch Dashboard](https://app.langwatch.ai):
- Monitor all agent interactions
- Debug tool calls and decisions
- Track performance metrics
- Analyze conversation flows

## Testing Philosophy

This project follows the [Agent Testing Pyramid](https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid):

1. **Unit Tests**: Test individual functions and tools (deterministic)
2. **Scenario Tests**: Test multi-turn conversations and agent behavior (simulation-based)
3. **Manual Testing**: Final validation through the UI

**Key Testing Principles:**
- Never check for regex or word matches - use judge criteria instead
- Use deterministic assertions for tool calls and data
- Use AI judge for evaluating conversation quality
- Write as few scenarios as possible that cover the most ground

## Available Scripts

```bash
pnpm dev              # Start Mastra dev server with UI
pnpm start            # Run CLI version of agent
pnpm build            # Build TypeScript
pnpm test             # Run all tests
pnpm test:watch       # Watch mode for tests
pnpm test:scenarios   # Run scenario tests only
pnpm prompt:create    # Create new prompt
pnpm prompt:sync      # Sync prompts to LangWatch
pnpm prompt:list      # List all prompts
```

## Architecture

### Agent Stack

- **Framework**: Mastra - TypeScript-first agent framework
- **LLM**: Google Gemini 2.0 Flash Experimental (latest)
- **Memory**: LibSQL for conversation context
- **Tools**: Custom weather tool using Open-Meteo API
- **Observability**: LangWatch for tracing and monitoring
- **Testing**: Scenario for simulation-based tests

### Key Components

1. **Weather Agent** (`src/mastra/agents/weather-agent.ts`)
   - Main agent with conversation capabilities
   - Uses LangWatch-managed prompts
   - Memory-enabled for context retention

2. **Weather Tool** (`src/mastra/tools/weather-tool.ts`)
   - Geocoding and weather data fetching
   - Error handling and validation
   - Typed inputs/outputs with Zod

3. **Scenario Tests** (`tests/scenarios/weather-agent.test.ts`)
   - Multi-turn conversation simulation
   - AI-powered user simulator
   - Automated evaluation with judge

## Best Practices Implemented

✅ **Prompt Management**
- All prompts stored as YAML files
- Version controlled with Git
- Synced to LangWatch platform
- Never hardcoded in application code

✅ **Testing**
- Scenario tests for agent behavior
- Judge criteria for evaluation
- Deterministic tool call assertions

✅ **Observability**
- LangWatch integration for tracing
- Full conversation logging
- Performance monitoring

✅ **Code Quality**
- TypeScript for type safety
- Zod for runtime validation
- Clear separation of concerns

## Resources

- [Mastra Documentation](https://mastra.ai)
- [LangWatch Documentation](https://docs.langwatch.ai)
- [Scenario Testing Guide](https://scenario.langwatch.ai)
- [Agent Testing Pyramid](https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid)

## Contributing

When adding new features:

1. Update or create prompts using `pnpm prompt:create`
2. Implement the feature in the agent
3. Write Scenario tests to validate behavior
4. Run tests to ensure everything passes
5. Sync prompts with `pnpm prompt:sync`
6. Update documentation

## License

ISC

---

Built with ❤️ using [Mastra](https://mastra.ai) and [LangWatch](https://langwatch.ai)
