import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import groupByWeek from "./groupByWeek";
import { useTransactions } from "../hooks/useTransactions";

export default function Statistics() {

    const {transactions, isLoading} = useTransactions()

    if (isLoading) return <div>Loading...</div>
    if (transactions.length === 0 || !transactions) return <div>No transaction data available</div>

    const groupByWeekData = groupByWeek(transactions);


    return (
        <div className="p-2 m-1 border border-black text-black rounded-lg h-full">
            <p>Statistics</p>
            <div style={{ width: '100%', height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={groupByWeekData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#8884d8" />
                        <Bar dataKey="expenses" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}