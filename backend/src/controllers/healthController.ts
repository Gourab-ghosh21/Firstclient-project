import { Request, Response } from 'express';
import { config } from '../config';
import { supabaseService } from '../services/supabaseService';

export function getHealth(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: 'Jyoti Enterprise Wholesale API is operational',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    port: config.port,
    supabaseConnected: supabaseService.isConnected,
    version: '1.0.0',
  });
}
