import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes'; // Importing auth routes
import transactionRoutes from './routes/transactionRoutes';
import uploadRoutes from './routes/fileUploadRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import getStockPrice from './api/get_stock_price';

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true})) 
app.use(express.json());

// ********** Auth, transations, upload **********
app.use('/api', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api', uploadRoutes)

app.get('/api/get_stock_price', authenticateToken, getStockPrice)

// ********** Listening to Port **********
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});