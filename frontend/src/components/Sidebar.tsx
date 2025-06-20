import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className=''>
            <h1>Sidebar</h1>
            <div>
                <Link to="/">HomePage</Link>
            </div>
            <div>
                <Link to="/transactions">Transactions</Link>
            </div>
            <div>Investment</div>
            <div>Bills</div>
            <div>Expense</div>
            <div>Goals</div>
            <div>Settings</div>
            <div>SplitWise?</div>

            <div>
                <p>View Profile?</p>
            </div>
        </div>
    )
}