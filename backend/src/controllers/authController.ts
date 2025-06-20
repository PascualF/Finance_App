import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()
const JWT_SECRET = 'my_secret_key'; // Added to the .env file and keep it secretier
const JWT_EXPIRATION = '1d'; // Added to the .env file and keep it secretier
const saltRounds = 10; // Added to the .env file and keep it secretier

export const signup = async(req: Request, res: Response) => {
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
}

export const login = async (req: Request, res: Response) => {
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
}