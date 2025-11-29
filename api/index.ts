import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Weather Agent API is running',
      status: 'healthy',
      endpoints: {
        health: 'GET /',
        agent: 'POST / with body: { "message": "your question" }'
      }
    });
    return;
  }

  // Handle agent requests
  if (req.method === 'POST') {
    try {
      // Dynamically import mastra to avoid cold start issues
      const { mastra } = await import('../dist/mastra/index.js');
      
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
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
