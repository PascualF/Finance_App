import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import fs from 'fs'
import parseCsv from "../utils/parseCsv";
import { filterDuplicates } from "../utils/filterDuplicates";

interface CsvRecord {
    date: string;
    description: string;
    amount: string;
    type: string;
    category: string;
}

export const fileUpload = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const filePath = req.file?.path;
        if(!filePath) {
            res.status(400).json({msg:'No file uploaded...'})
            return;
        }

        const fileData = fs.readFileSync(filePath, 'utf-8') // Will get the data.
        console.log(fileData)
        
        let resultParsedData = await parseCsv<CsvRecord>(fileData)
        let csvData = resultParsedData.data
        console.log(csvData)
        if (!csvData || csvData.length === 0) {
            res.status(400).json({msg:'No valid CSV data found...'})
            return;
        }

        let csvDataTransformed: any[] = csvData.map(record => ({
            title: record.description,
            amount: parseFloat(
                record.amount[0] === '-' ? record.amount.slice(1) : record.amount
            ),
            category: record.category,
            type: record.type,
            transactionDate: new Date(record.date).toISOString(),
            userId: userId // Add userId to each record
        }))
        
        // Filter out duplicates based on title, amount, and transactionDate
        const existingTransactions = await prisma.transaction.findMany({
            where: { userId: userId },
            select: {
                title: true,
                amount: true,
                transactionDate: true
            }
        })

        const filteredData = filterDuplicates(csvDataTransformed, existingTransactions)

        const result = await prisma.transaction.createMany({
                data: filteredData
            }).catch((error) => {
                console.error('Error inserting CSV data into database:', error)
                res.status(500).json({msg:'Error inserting CSV data into database'})
                return ;
        })
        res.json(result)
        
    } catch (error){
        console.error(error)
        res.status(500).json({msg:'No file found...'})
    }
}