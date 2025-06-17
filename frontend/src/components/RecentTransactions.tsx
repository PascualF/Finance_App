import { useTransactions } from "../hooks/useTransactions"

export default function RecentTransactions() {

    const {transactions, isLoading} = useTransactions()

    if(isLoading) return <p>Loading...</p>

    const lastFiveTransactions = transactions.slice(-5); // extract the last 5 transactions

    return (
        <div>
            <h2>Recent Transactions</h2>
            <ul>
            {lastFiveTransactions.map(transaction => (
                <li key={transaction.id} className="border border-black">
                    <p>{transaction.title}</p>
                    <p>{transaction.amount}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}