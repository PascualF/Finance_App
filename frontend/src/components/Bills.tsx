import { Link } from 'react-router'

/* interface Bill {
    id: number;
    title: string;
    amount: number;
    dueDate: string;
    category: string;
    confirmed: boolean; // Confirming if user payed or not.
} */

// Then function Bills should pass prosp to both Views;
export default function Bills({mode}:{mode: string}) {

    return (
        <div className='text-black'>
            {mode === 'dashboard' ? <DashboardBillsView /> : <CalendarBillsView />}
        </div>
    )
}

function DashboardBillsView() {
    return (
        <div className="text-black">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Bills</h2>
                <Link to="/bills" className="text-blue-600 hover:underline text-sm">View all →</Link>
            </div>
        </div>
    )
}

function CalendarBillsView(){
    return (
        <div>This is the Calendar View</div>
    )
}