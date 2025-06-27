import { useTransactions } from "../hooks/useTransactions"
import { Link } from "react-router"
import { format } from "date-fns"
import { useMediaQuery } from "react-responsive"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    const smallScreenRecentTransactions = useMediaQuery({ maxWidth: 640})
    const mediumScreenRecentTransactions = useMediaQuery({ minWidth: 642, maxWidth: 1024})

    if(isLoading) return <p>Loading...</p>

    // Define recent transactions by screen.
    let defaultLimitTransactions = 11;
    if (smallScreenRecentTransactions) defaultLimitTransactions = 3
    else if (mediumScreenRecentTransactions) defaultLimitTransactions = 5

    if(transactions.length === 0 || !transactions) return <p>No transactions available</p>
    const lastElevenTransactions = transactions.slice(0, defaultLimitTransactions);

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                <Link to="/transactions" className="text-blue-600 hover:underline text-sm">View all →</Link>
            </div>
            <ul className="space-y-2">
                {lastElevenTransactions.map(transaction => (
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