import express from 'express';
import morgan from 'morgan';
import { initializeDatabase } from './database';
import shipRoutes from './routes/shipRoutes';
import tripRoutes from './routes/tripRoutes';
import locationRoutes from './routes/locationRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/ship', shipRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/location', locationRoutes);

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
