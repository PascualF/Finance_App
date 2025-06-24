import { useEffect, useState } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../services/api";
import { Transaction } from "./types/TransactionType";
import { TransactionsContext } from '../context/TransactionsContext'

// Creates the provier
export function TransactionsProvider({children}:{children: React.ReactNode}) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetching data
    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async() => {
        try {
            const data = await getTransactions()
            setTransactions(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const add = async (data: Omit<Transaction, "id">) => {
        try{
            const response = await addTransaction(data);
                setTransactions(prev => [...prev, response]);
            }  catch (error) {
                console.error("Failed to add transaction:", error)
        }
    } 

    const remove = async (data: Transaction) => {
        
        try{
            await deleteTransaction(data.id)
            setTransactions(prev => prev.filter(t => t.id !== data.id))
        } catch (error) {
            console.error("Failed to delete transaction:", error)
        }
    }

    const value = {
        transactions,
        setTransactions,
        isLoading,
        add,
        remove,
        fetchTransactions
    }

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}