import { Link } from 'react-router'

interface Bill {
    id: number;
    title: string;
    amount: number;
    dueDate: string;
    category: string;
    confirmed: boolean; // Confirming if user payed or not.
}


export default function Bills() {

    

    return (
        <div className="p-2 m-1 text-black rounded-lg h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Bills</h2>
                <Link to="/upcomingbills" className="text-blue-600 hover:underline text-sm">View all →</Link>
            </div>
        </div>
    )
}