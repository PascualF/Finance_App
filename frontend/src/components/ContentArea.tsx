import Goals from "./Goals"
import RecentTransactions from "./RecentTransactions"

export default function ContentArea() {

    return (
        <div className="grid grid-cols-3 grid-rows-3">
            <Goals />
            <div className="col-start-2 col-end-3">
                <RecentTransactions />
            </div>
        </div>
    )
}
