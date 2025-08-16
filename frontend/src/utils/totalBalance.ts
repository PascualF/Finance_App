import { Transaction } from "../context/types/TransactionType";

export default function calculateTotalBalance({
    transactions,
    investments,/* 
    splitBills, */
}: {
    transactions: Transaction[];
    investments: Investment[];/* 
    splitBills: splitBill[]; */
}){
    const transactionTotal = transactions.reduce((acc, currTransactions) => {
        const amount = currTransactions.type === 'expense' ? -curr.amount : curr.amount;
        return acc + amount 
    }, 0)

    const investmentTotal = investments.reduce((acc, currInvestments) => {
        return acc + currInvestments
    }, 0)

    /* const splitBillTotal = splitBills.reduce((acc, currSplitBill) => {
        return acc + currSplitBill
    }, 0) */

    return transactionTotal + investmentTotal
}