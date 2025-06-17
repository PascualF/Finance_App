import { useTransactions } from "../hooks/useTransactions"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    if(isLoading) return <p>Loading...</p>

    const lastFiveTransactions = transactions.slice(-5); // extract the last 5 transactions

    return (
        <div className="border border-black m-1 px-1 rounded-sm bg-green-300 shadow-lg shadow-green-600">
            <h2>Recent Transactions</h2>
            <ul>
            {lastFiveTransactions.map(transaction => (
                <li key={transaction.id}>
                    <p>{transaction.title}</p>
                    <p>{transaction.amount}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}