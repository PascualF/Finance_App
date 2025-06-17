import { useEffect, useState } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../services/api";
import { Transaction } from "./types/TransactionType";
import { TransactionsContext } from '../context/TransactionsContext'

// The shape of the data to share in context/provider
/* interface TransactionsContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    isLoading: boolean;
    add: (data: Omit<Transaction, "id">) => Promise<void>;
    remove: (data: Transaction) => Promise<void>
}

// This creates the context
const TransactionsContext = createContext<TransactionsContextType | null>(null) */

// Creates the provier
export function TransactionsProvider({children}:{children: React.ReactNode}) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetching data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions()
                setTransactions(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])



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
        remove
    }

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}