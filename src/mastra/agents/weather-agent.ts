import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { LangWatch } from 'langwatch';
import { weatherTool } from '../tools/weather-tool';

// Initialize LangWatch for prompt management
const langwatch = new LangWatch({
  apiKey: process.env.LANGWATCH_API_KEY,
});

// Get the prompt from LangWatch
const weatherPrompt = await langwatch.prompts.get('weather-assistant');

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: weatherPrompt?.prompt || `
      You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative
      - If the user asks for activities and provides the weather forecast, suggest activities based on the weather forecast.
      - If the user asks for activities, respond in the format they request.

      Use the weatherTool to fetch current weather data.
`,
  model: weatherPrompt?.model || 'google/gemini-2.0-flash-exp',
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});

