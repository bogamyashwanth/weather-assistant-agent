/**
 * Scenario tests for the Weather Agent
 * 
 * This demonstrates simulation-based testing following LangWatch best practices:
 * - User simulator generates realistic conversation
 * - Judge evaluates against success criteria
 * - Deterministic assertions for tool calls
 */

import { describe, it, expect } from 'vitest';
import scenario, { type AgentAdapter, AgentRole } from '@langwatch/scenario';
import { weatherAgent } from '../../src/mastra/agents/weather-agent';

// Create agent adapter for Scenario
const weatherAgentAdapter: AgentAdapter = {
  role: AgentRole.AGENT,
  call: async (input) => {
    const result = await weatherAgent.generate(input.messages);
    return result.response.messages;
  },
};

describe('Weather Agent - Scenario Tests', () => {
  it('should provide weather information when user asks for a specific location', async () => {
    const result = await scenario.run({
      name: 'weather lookup for specific city',
      description: `
        The user wants to know the current weather in San Francisco.
        They are planning outdoor activities and need to know if it's suitable.
      `,
      agents: [
        weatherAgentAdapter,
        scenario.userSimulatorAgent(),
        scenario.judgeAgent({
          criteria: [
            'Agent should ask for or confirm the location',
            'Agent should use the weather tool to fetch current data',
            'Agent should provide temperature information',
            'Agent should mention weather conditions (e.g., clear, cloudy, rainy)',
            'Response should be helpful and concise',
          ],
        }),
      ],
      script: [
        scenario.user('What\'s the weather in San Francisco?'),
        scenario.agent(),
        scenario.judge(),
      ],
    });

    // Assert the scenario succeeded
    expect(result.success).toBe(true);
  }, 60000);

  it('should handle multi-turn conversation about weather and activities', async () => {
    const result = await scenario.run({
      name: 'weather and activity planning',
      description: `
        It's Saturday afternoon. The user is planning their weekend activities
        and wants to know if the weather is good for outdoor activities in their city.
        They might ask follow-up questions about the weather details.
      `,
      agents: [
        weatherAgentAdapter,
        scenario.userSimulatorAgent(),
        scenario.judgeAgent({
          criteria: [
            'Agent should get the weather information for the requested location',
            'Agent should suggest appropriate activities based on weather conditions',
            'Agent should answer any follow-up questions about weather details',
            'Agent should maintain context across multiple turns',
            'Conversation should feel natural and helpful',
          ],
        }),
      ],
      script: [
        scenario.user('I\'m in New York. What outdoor activities would you recommend for today?'),
        scenario.agent(),
        scenario.user(),
        scenario.agent(),
        scenario.judge(),
      ],
    });

    expect(result.success).toBe(true);
  }, 60000);

  it('should handle unclear location requests appropriately', async () => {
    const result = await scenario.run({
      name: 'unclear location handling',
      description: `
        The user asks about the weather but doesn't provide a specific location.
        The agent should ask for clarification rather than making assumptions.
      `,
      agents: [
        weatherAgentAdapter,
        scenario.userSimulatorAgent(),
        scenario.judgeAgent({
          criteria: [
            'Agent should ask for the location if not provided',
            'Agent should not assume a location',
            'Agent should be polite and clear in requesting information',
            'Once location is provided, agent should fetch and present weather data',
          ],
        }),
      ],
      script: [
        scenario.user('What\'s the weather like?'),
        scenario.agent(),
        scenario.user(),
        scenario.agent(),
        scenario.judge(),
      ],
    });

    expect(result.success).toBe(true);
  }, 60000);
});
