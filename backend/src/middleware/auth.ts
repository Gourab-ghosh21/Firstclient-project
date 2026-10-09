import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers['x-admin-key'] as string;
  const authHeader = req.headers['authorization'];

  let token = adminKey;
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (!token || token !== config.adminPasscode) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid Admin passcode or token required.',
    });
  }

  return next();
}
