import { useTransactions } from "../hooks/useTransactions"
import { Link } from "react-router"
import { format } from "date-fns"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    if(isLoading) return <p>Loading...</p>

    if(transactions.length === 0 || !transactions) return <p>No transactions available</p>
    const lastFiveTransactions = transactions.slice(-8); // extract the last 5 transactions

    return (
        <div className="text-black border border-black m-1 px-1 rounded-sm bg-black-300 shadow-lg shadow-green-600 h-auto">
            <div className="flex justify-between">
                <h2>Recent Transactions</h2>
                <Link to="/transactions">{'Link to transactions >>'}</Link>
            </div>
            <ul>
            {lastFiveTransactions.map(transaction => (
                <li key={transaction.id} className="flex">
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