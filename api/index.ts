import { mastra } from '../src/mastra/index.js';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Simple health check
  if (req.method === 'GET' && req.url === '/') {
    res.status(200).json({
      message: 'Weather Agent API is running',
      status: 'healthy',
      agents: Object.keys(mastra.agents),
      workflows: Object.keys(mastra.workflows),
    });
    return;
  }

  // Handle agent requests
  if (req.method === 'POST' && req.url?.includes('/agent')) {
    try {
      const { message } = req.body;
      
      if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const result = await mastra.agents.weatherAgent.generate([
        { role: 'user', content: message }
      ]);

      res.status(200).json({
        response: result.text,
        toolCalls: result.toolCalls,
      });
    } catch (error: any) {
      console.error('Agent error:', error);
      res.status(500).json({
        error: 'Failed to process request',
        message: error.message,
      });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
