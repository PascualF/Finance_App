import ExpensesBreakdown from "./ExpensesBreakdown"
import Goals from "./Goals"
import RecentTransactions from "./RecentTransactions"
import Statistics from "./Statistics"
import TotalBalance from "./TotalBalance"
import Bills from "./Bills"

export default function ContentArea() {

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 w-full max-w-screen-xl mx-auto"> 
            {/* Making the grid responsive */}
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <TotalBalance />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <Goals />
                </div>
                <div className="md:col-span-2 xl:col-span-1 p-4 bg-white rounded-lg shadow-md w-full">
                    <Bills mode="dashboard" />   
                </div>
                <div className="md:col-span-2 xl:col-span-1 bg-white rounded-lg shadow-md w-full">
                    <RecentTransactions  />
                </div>
                <div className="md:col-span-2 p-4 bg-white shadow rounded-lg shadow-md">
                    <Statistics />
                </div>
                <div className="md:col-span-3 p-4 bg-white shadow rounded-lg shadow-md">
                    <ExpensesBreakdown mode="dashboard" />
                </div>
            </div>
        </div>
    )
}
