import cors from 'cors';
import { config } from '../config';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    const configuredOrigins = config.corsOrigin
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);

    const allowedOrigins = [
      ...configuredOrigins,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ];

    if (
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      (config.nodeEnv === 'development' && origin.startsWith('http://localhost:'))
    ) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS origin ${origin} not permitted`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
});
