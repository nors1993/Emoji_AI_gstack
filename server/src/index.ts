import dotenv from 'dotenv';
dotenv.config(); // Load env FIRST, before any other imports

import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test API connection endpoint
app.get('/api/test-connection', async (req, res) => {
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const apiKey = process.env.OPENAI_API_KEY;
  
  try {
    console.log('Testing connection to:', baseUrl);
    
    // First try DNS lookup
    const url = new URL(baseUrl);
    console.log('Hostname:', url.hostname);
    
    const response = await fetch(`${baseUrl}/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    console.log('Connection test success');
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Connection test failed:', error);
    res.json({ 
      success: false, 
      error: error.message, 
      hostname: new URL(baseUrl).hostname
    });
  }
});

// Direct chat endpoint using native fetch (bypasses SDK)
app.use('/api/chat-direct', chatRouter);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🌟 aiAurora Server Running                      ║
║                                                   ║
║   Port: ${PORT}                                      ║
║   Mode: ${process.env.NODE_ENV || 'development'}                           ║
║                                                   ║
║   Endpoints:                                      ║
║   - POST /api/chat    (chat with companion)       ║
║   - GET  /health     (health check)              ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
