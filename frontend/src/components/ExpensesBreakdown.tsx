import { Link } from 'react-router'

/* const categories = [
    { name: "Housing", amount: 1200 },
    { name: "Food", amount: 450 },
    { name: "Transport", amount: 130 },
]
 */

export default function ExpensesBreakdown({mode}:{mode: string}) {

    

    return (
        <div>
            { mode ===  'dashboard' ? <DashboardExpensesView /> : <TotalExpensesView />}
        </div>
    )
}

function DashboardExpensesView(){
    return (
        <div className="text-black">
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-800'>Expenses Breakdown</h2>
                <Link to='/expenses' className='text-blue-600 hover:underline text-sm'>View all →</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {/* Expenses: Housing (rent, insurance, utilisties elec andwater) */}
                {/* Food: groceries, dining out take out, coffee snacks */}
                {/* Transportatoon: gas, public transport, car stuff, insurane */}
                {/* Bills: phone, internet, streaming, gym and all */}
                {/* Health: HEalth, medications, doctor, therapy */}
                {/* Personal shoppign: clothes, beaut and hair, gifts */}
                {/* Entertainement: events, hobbies, travel */}
                {/* Financial: debts, investment?? */}
            </div>
        </div>
    )
}

function TotalExpensesView(){
    return (
        <div>
            <p>Expenses main view</p>
        </div>
    )
}