import axios from "axios"
import { AuthRequest } from "../middleware/authMiddleware"
import {Response} from "express"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function getStockPrice(req: AuthRequest, res: Response) {
    
    try{
        let getTodayDate = new Date()
        // if a sunday or saturday
        if(getTodayDate.getDay() === 0 || getTodayDate.getDay() === 6) {
            const t = new Date().getDate() + (6 - new Date().getDay() - 1)  - (new Date().getDay() == 6 ? 0 : 7);
            const lastFriday = new Date();
            lastFriday.setDate(t);
            getTodayDate = lastFriday // change the current date to last friday
        }
        
        // if not last 
        const checkStock = await prisma.investments.findMany({
            where: {
                symbol: 'VWCE.DE',
                date: new Date(getTodayDate.toISOString().split('T')[0])
            }
        })

        const getCurrentDataToString = getTodayDate.toISOString()
        const getCurrentDateFormatted = getCurrentDataToString.split('T')[0]

        // when a new one arrives
/* 
        await db.stocks.insertOne({ symbol: "VWCE.DE", name: "ETF VWCE" });
        const apiRes = await fetchPriceFromAlphaVantage("VWCE.DE");
        await db.stockPrices.insertOne({ symbol: "VWCE.DE", date: today, price: apiRes.price });
 */

        

        /* const response = await axios.get("https://www.alphavantage.co/query", {
            params: {
                function: 'TIme_SERIES_DAILY',
                symbol: 'VWCE.DE',
                apikey: 'IYVNAE09BHAMCIK6' // make it a secret
            }
        }) */

        /* console.log(response.data['Time Series (Daily)']) */
        
        
        res.json({stockData: checkStock})
    } catch (error) {
        console.error("Error fetching stock price: ", error)
        res.status(500).json({ error: "Failed to fetch stock price "})
    }
}