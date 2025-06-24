import { useTransactions } from "../hooks/useTransactions"
import { Link } from "react-router"
import { format } from "date-fns"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    if(isLoading) return <p>Loading...</p>

    if(transactions.length === 0 || !transactions) return <p>No transactions available</p>
    const lastFiveTransactions = transactions.slice(-8); // extract the last 8 transactions

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                <Link to="/transactions" className="text-blue-600 hover:underline text-sm">View all →</Link>
            </div>
            <ul className="space-y-2">
                {lastFiveTransactions.map(transaction => (
                    <li 
                        key={transaction.id} 
                        className="flex justify-between items-center border-b py-2 text-sm text-gray-500"
                    >
                        <span className="w-1/2 truncate font-medium">{transaction.title}</span>
                        <span className="w-1/4 text-right">
                            <span className={transaction.type === 'expense' ? "text-red-500" : "text-green-600"}>
                                {transaction.type === 'expense' ? `-${transaction.amount}` : `+${transaction.amount}`}
                            </span>
                        </span>
                        <span className="text-gray-400">{format(new Date(transaction.transactionDate), "MMM-dd")}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}