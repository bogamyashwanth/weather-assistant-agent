import { config } from 'dotenv';

// Load environment variables from .env file for tests
config();

// Ensure required environment variables are set
if (!process.env.GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY is not set in .env file');
}

if (!process.env.LANGWATCH_API_KEY) {
  console.warn('WARNING: LANGWATCH_API_KEY is not set in .env file (optional but recommended for tracking)');
}
