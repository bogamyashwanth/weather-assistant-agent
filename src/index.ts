/**
 * CLI entry point for the weather agent.
 * 
 * This demonstrates a simple command-line interface to interact with the agent.
 * For a full UI experience, run: pnpm dev
 */

import { config } from 'dotenv';
import { weatherAgent } from './mastra/agents/weather-agent';

// Load environment variables
config();

const main = async () => {
  console.log('🌤️  Welcome to the Weather Agent!');
  console.log('Ask me about the weather in any location.\n');

  // Example interaction
  const userMessage = 'What\'s the weather like in San Francisco?';
  console.log(`User: ${userMessage}\n`);

  try {
    const result = await weatherAgent.generate([
      { role: 'user', content: userMessage }
    ]);

    console.log(`Agent: ${result.text}\n`);
    console.log('✅ Agent responded successfully!');
    console.log('\nFor a full UI experience, run: pnpm dev');
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('\nMake sure you have set GEMINI_API_KEY in your .env file');
  }
};

main();
