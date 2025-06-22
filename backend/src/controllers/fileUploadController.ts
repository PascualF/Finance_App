import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import fs from 'fs'
import { parse } from 'csv-parse'

export const fileUpload = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const filePath = req.file?.path

        if(!filePath) {
            res.status(400).json({msg:'No file uploaded...'})
            return;
        }

        const fileData = fs.readFileSync(filePath, 'utf-8')
        console.log(fileData)
        

        res.json("Receving uploaded file csv")
    } catch (error){
        console.error(error)
        res.status(500).json({msg:'No file found...'})
    }
    
}