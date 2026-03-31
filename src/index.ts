import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobCardRoutes from './routes/jobCardRoutes.js';
import laborRoutes from './routes/laborRoutes.js';
import partRequestRoutes from './routes/partRequestRoutes.js';
import inspectionRoutes from './routes/inspectionRoutes.js';
import billingRoutes from './routes/billingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8009;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobCardRoutes);
app.use('/api/labor', laborRoutes);
app.use('/api/parts', partRequestRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/billing', billingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gadal Maintenance System API is running' });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME || 'TEST_CRM_DB'}`;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

export default app;
