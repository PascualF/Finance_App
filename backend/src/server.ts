import express from 'express';
import cors from 'cors'

import authRoutes from './routes/authRoutes'; // Importing auth routes
import transactionRoutes from './routes/transactionRoutes';
import uploadRoutes from './routes/fileUploadRoutes';

const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true})) 
app.use(express.json());

// ********** Auth, transations, upload **********
app.use('/api', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api', uploadRoutes)

// ********** Listening to Port **********
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});