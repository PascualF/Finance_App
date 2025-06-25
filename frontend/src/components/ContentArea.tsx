import ExpensesBreakdown from "./ExpensesBreakdown"
import Goals from "./Goals"
import RecentTransactions from "./RecentTransactions"
import Statistics from "./Statistics"
import TotalBalance from "./TotalBalance"
import Bills from "./Bills"

export default function ContentArea() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4"> 
        {/* Making the grid responsive */}
            <div className="col-span-1 p-4 bg-white shadow rounded-lg h-full shadow-md">
                <TotalBalance />
            </div>
            <div className="col-span-1 p-4 bg-white shadow rounded-lg h-full shadow-md">
                <Goals />
            </div>
            <div className="col-span-1  p-4 bg-white shadow rounded-lg h-full shadow-md">
                <Bills />   
            </div>
            <div className="col-span-1 row-span-2 md:col-span-2 xl:col-span-1">
                <RecentTransactions  />
            </div>
            <div className="col-span-2 p-4 bg-white shadow rounded-lg h-full shadow-md">
                <Statistics />
            </div>
            <div className="col-span-2 p-4 bg-white shadow rounded-lg h-full shadow-md">
                <ExpensesBreakdown />
            </div>
        </div>
    )
}
