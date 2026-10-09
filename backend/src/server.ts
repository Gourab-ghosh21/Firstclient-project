import express from 'express';
import morgan from 'morgan';
import { config } from './config';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes';

const app = express();

// Global Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Mount REST API
app.use('/api', apiRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    name: 'Jyoti Enterprise Wholesale API',
    status: 'online',
    healthCheck: '/api/health',
    version: '1.0.0',
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`=================================================`);
  console.log(` Jyoti Enterprise Backend Server`);
  console.log(` Running on: http://localhost:${config.port}`);
  console.log(` Health:     http://localhost:${config.port}/api/health`);
  console.log(` CORS:       ${config.corsOrigin}`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log(`=================================================`);
});

export default app;
