import { useTransactions } from "../hooks/useTransactions"
import {format} from "date-fns"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    if(isLoading) return <p>Loading...</p>

    if(transactions.length === 0 || !transactions) return <p>No transactions available</p>
    const lastFiveTransactions = transactions.slice(-8); // extract the last 5 transactions

    return (
        <div className="text-black border border-black m-1 px-1 rounded-sm bg-black-300 shadow-lg shadow-green-600 h-auto">
            <div>
                <h2>Recent Transactions</h2>
                <p>Link to transactions</p>
            </div>
            <ul>
            {lastFiveTransactions.map(transaction => (
                <li key={transaction.id}>
                    <p>{transaction.title}</p>
                    <p>
                        {transaction.type === 'Expense' && '-' + transaction.amount}
                    </p>
                    <p>{format(new Date(transaction.transactionDate), "MMM-dd")}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}