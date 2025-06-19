import ExpensesBreakdown from "./ExpensesBreakdown"
import Goals from "./Goals"
import RecentTransactions from "./RecentTransactions"
import Statistics from "./Statistics"
import TotalBalance from "./TotalBalance"
import UpcomingBills from "./UpcomingBills"

export default function ContentArea() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4"> 
        {/* Making the grid responsive */}
            <div className="col-span-1 xl:col-span-1">
                <TotalBalance />
            </div>
            <div className="col-span-1 xl:col-span-1">
                <Goals />
            </div>
            <div>
                <UpcomingBills />   
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-4">
                <RecentTransactions  />
            </div>
            <div className="col-start-2 col-end-4">
                <Statistics />
            </div>
            <div className="col-start-2 col-end-4">
                <ExpensesBreakdown />
            </div>
        </div>
    )
}
