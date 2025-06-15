import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const port = process.env.PORT || 4000;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient()
const JWT_SECRET = 'my_secret_key'; // Added to the .env file and keep it secretier
const JWT_EXPIRATION = '1d'; // Added to the .env file and keep it secretier
const saltRounds = 10; // Added to the .env file and keep it secretier

// Middleware
// Check for adjusting Frontend?? Saw it somwhere but can't find again
app.use(cors({ origin: 'http://localhost:5173', credentials: true})) 
app.use(express.json());

// Auth middleware to verify JWT tokens
interface AuthRequest extends Request {
  userId?: number
}

// Auth token JWT - middleware
const authenticateToken = (req: AuthRequest, res: Response, next: Function) => {
  console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) {
    res.status(401).json({error : 'Access token required'})
    return 
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if(err) {
      return res.status(403).json({error: 'Invalid or expired token'})
    }
    req.userId = decoded.userId;
    next()
  })
}

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

// TS interface transaction inpu type
interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: string;
}

app.post('/api/transactions', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { title, amount, category, type}: TransactionInput = req.body.transaction
  try {
    const transaction = await prisma.transaction.create({
    data: {
      title: title,
      amount: amount,
      category: category,
      type: type,
      userId: req.userId
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

// Login and Signup routes
app.post('/api/signup', async (req: Request, res: Response) => {
  try{
    const { email, password} = req.body;
    const existingUser = await prisma.user.findUnique({ 
      where: { email }
    });

    if(existingUser) {
      res.status(400).json({error: "User already exists"});
      return 
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword
      }
    })

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.status(201).json({
      userId: newUser.id, 
      email: newUser.email,
      token
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({error: "Internal server error"});
  }
})

app.post('/api/login', async (req: Request, res: Response) => {
  try{
    const { email, password } = req.body;

    let existingUser= await prisma.user.findUnique({ where: { email } });
    if(!existingUser) {
        res.status(404).json({error: "User not found"})
        return 
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if(!isValidPassword) {
      res.status(404).json({error: "Invalid password"});
      return 
    }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    console.log(token)

    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token})
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({error: "Internal server error"});
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});