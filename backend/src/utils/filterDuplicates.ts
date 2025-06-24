// This will be aplied to the prisma.createMany, since it ignores the @@unique
// This can be ignored when I will change from SQLite to PostgreSQL => DB

// Transaction model in Prisma schema
import { Transaction, Prisma } from "@prisma/client";

// TransactioInput interface for incoming transaction data
/* interface TransactionInput {
    title: string;
    amount: number;
    transactionDate: string; // ISO date string
    userId: number;
    catagory: string;
    type: string;
} */

// existingTransaction only 'picks' the necessary fields from Transaction => title, amount and transactionDate
export const filterDuplicates =  (
    newTransactions: Prisma.TransactionCreateManyInput[],
    existingTransactions: Pick<Transaction, "title" | "amount" | "transactionDate">[]
): Prisma.TransactionCreateManyInput[] => {

    // This will create a Set of existing transactions based on a unique key created from title, amount, and transactionDate.
    const existingSet = new Set(
        existingTransactions.map(transaction => {
            const dateKey = transaction.transactionDate ? new Date(transaction.transactionDate).toISOString() : 'invalid-date'
            return `${transaction.title}-${transaction.amount}-${dateKey}`
        })
    )

    // This will filter the new transactions, keeping only those that do not exist in the existingSet.
    return newTransactions.filter(transaction => {
        const dateValue = transaction.transactionDate;
        if (!dateValue) return false; // Skip if transactionDate is not provided
        const key = `${transaction.title}-${transaction.amount}-${new Date(dateValue).toISOString()}`
        return !existingSet.has(key)
    })
}