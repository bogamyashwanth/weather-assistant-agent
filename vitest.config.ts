import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';

// Load environment variables for tests
config();

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    testTimeout: 60000, // 60 seconds for agent tests
  },
});
