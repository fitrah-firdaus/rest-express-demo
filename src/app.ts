import express, { Application } from 'express';
import userRoutes from './routes/users';

const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({ error: err.message });
});

export default app;
