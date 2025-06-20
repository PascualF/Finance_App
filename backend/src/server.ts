import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const port = process.env.PORT || 4000;
import authRoutes from './routes/authRoutes'; // Importing auth routes
import { authenticateToken } from './middleware/authMiddleware'; // Importing auth middleware
import { AuthRequest } from './middleware/authMiddleware';

const app = express();

// Erase start
const prisma = new PrismaClient()
// Erase end

// Middleware
app.use(cors({ origin: '*', credentials: true})) 
app.use(express.json());


// Handle transactions routes.
app.get('/api/transactions', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const response = await prisma.transaction.findMany({
      where: { userId: req.userId}
    }) // userID will be added here
    res.json(response)
  } catch (error) {
    console.error('Error fetching all the transactions: ', error)
    res.status(500).json({error: 'Internal server error'})
  }
});

// TS interface transaction input type
interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: string;
  transactionDate: string; // ISO date string
}

app.post('/api/transactions', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { title, amount, category, type, transactionDate}: TransactionInput = req.body.transaction
  try {
    const transaction = await prisma.transaction.create({
    data: {
      title: title,
      amount: amount,
      category: category,
      type: type,
      userId: req.userId,
      transactionDate: new Date(transactionDate) // Convert to Date object,
    }
  })

  res.json(transaction)
  } catch (error) {
    res.status(500).json({error: 'Internal server error'})
  }
  
})

app.delete('/api/transactions/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const idToNumber = Number(req.params.id)
    const deleteTransaction = await prisma.transaction.delete({
    where: {
      id: idToNumber
    }
  })
  res.json(deleteTransaction)
  } catch (error) {
    console.error('Error deleting transaction:', error)
    res.status(500).json({error: 'Internal server error'})
  }
})

// Handle file upload CSV...

// Login and Signup routes start here
app.use('/api', authRoutes)
// app.use('/api', transactionRoutes);

// Listening on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});