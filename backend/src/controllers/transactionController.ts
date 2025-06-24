import { Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { AuthRequest } from "../middleware/authMiddleware";

export const getAllTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const response = await prisma.transaction.findMany({
      where: { 
        userId: req.userId
      },
      orderBy: {
        transactionDate: 'desc'
      }
    }) // userID will be added here
    res.json(response)
  } catch (error) {
    console.error('Error fetching all the transactions: ', error)
    res.status(500).json({error: 'Internal server error'})
  }
};

interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: string;
  transactionDate: string; // ISO date string
}

export const addTransaction = async (req: AuthRequest, res: Response) => {
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
}

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
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
}