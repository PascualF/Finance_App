import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const port = process.env.PORT || 4000;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient()
const JWT_SECRET = 'my_secret_key'; // Added to the .env file and keep it secretier
const JWT_EXPIRATION = '1h'; // Added to the .env file and keep it secretier
const saltRounds = 10;

app.use(cors())
app.use(express.json());


app.get('/api/transactions', async (req, res) => {
  const response = await prisma.transaction.findMany()
  res.json(response)
});

app.post('/api/transactions', async (req, res) => {
  const { title, amount, category, type} = req.body.transaction
  const transaction = await prisma.transaction.create({
    data: {
      title: title,
      amount: amount,
      category: category,
      type: type
    }
  })
  res.json(transaction)
})

app.delete('/api/transactions/:id', async (req, res) => {
  console.log(req.params)
  const {id} = req.params
  const idToNumber = Number(id)
  const deleteTransaction = await prisma.transaction.delete({
    where: {
      id: idToNumber
    }
  })
  res.json(deleteTransaction)
})

// Login and Signup routes
app.post('/api/signup', async (req: Request, res: Response) => {
  try{
    const { email, password, name} = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

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
        name,
        password: hashPassword
      }
    })

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    
    res.status(201).json({
      userId: newUser.id, 
      email: newUser.email, 
      name: newUser.name
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

    res.json({token})
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({error: "Internal server error"});
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});