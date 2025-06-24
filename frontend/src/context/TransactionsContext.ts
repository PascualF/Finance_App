import { createContext } from "react";
import { Transaction } from "./types/TransactionType";

interface TransactionsContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    isLoading: boolean;
    add: (data: Omit<Transaction, "id">) => Promise<void>;
    remove: (data: Transaction) => Promise<void>;
    fetchTransactions: () => Promise<void>;
}

// This creates the context
export const TransactionsContext = createContext<TransactionsContextType | null>(null)