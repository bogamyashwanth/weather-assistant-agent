import { defineConfig } from '@langwatch/scenario/config';
import { google } from '@ai-sdk/google';

export default defineConfig({
  defaultModel: {
    model: google('gemini-2.0-flash-exp'),
  },
});
