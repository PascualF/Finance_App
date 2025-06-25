import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import groupByWeek from "./groupByWeek";
import { useTransactions } from "../hooks/useTransactions";

export default function Statistics() {

    const {transactions, isLoading} = useTransactions()

    if (isLoading) return <div>Loading...</div>
    if (transactions.length === 0 || !transactions) return <div>No transaction data available</div>

    const groupByWeekData = groupByWeek(transactions);


    return (
        <div className="m-1 text-black rounded-lg h-full">
            <p className="text-lg font-semibold text-gray-800 mb-4">Weekly Income vs Expenses</p>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={groupByWeekData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" tick={{fontSize: 12}}/>
                        <YAxis tick={{fontSize: 12}}/>
                        <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#4f46e5" name="Income"/>
                        <Bar dataKey="expenses" fill="#f87171" name="Expenses"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <p>Total Income??</p>
                <p>Total Expenses??</p>
            </div>
        </div>
    )
}