import { Router, Request, Response } from 'express';
import { sendChatMessage } from '../services/llm';
import { ChatRequest, ChatResponse } from '../types';

const router = Router();

/**
 * POST /api/chat
 * Send a message and get AI response with emotion
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body as ChatRequest;

    // Validate input
    if (!message || typeof message !== 'string') {
      res.status(400).json({ 
        error: 'Message is required and must be a string' 
      } as any);
      return;
    }

    // Sanitize input
    const sanitizedMessage = message.trim().slice(0, 2000);

    // Get response from LLM
    const chatResponse: ChatResponse = await sendChatMessage(sanitizedMessage);

    // Send response
    res.json(chatResponse);
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process chat request'
    } as any);
  }
});

export default router;
