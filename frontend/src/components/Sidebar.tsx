import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div>
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
            <div>Do I add like SplitWise?</div>

            <div>
                <p>Should I add - View PRofile</p>
            </div>
        </div>
    )
}