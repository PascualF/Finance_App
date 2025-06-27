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
            <p>The expenses breakdowns</p>
            <p>Housing, Food, Utilities, Gasoline/Transportation, Insurance, Other, Gifts, Cable TV & Internet, Cell Phone, Clothing</p>
            <p>Savings? ; Entertainement?</p>
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