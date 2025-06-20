import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_secret_key'; // Added to the .env file and keep it secretier

export interface AuthRequest extends Request {
  userId?: number
}

export const authenticateToken = (req: AuthRequest, res: Response, next: Function) => {
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