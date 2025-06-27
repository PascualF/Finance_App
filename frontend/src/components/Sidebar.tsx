import { Link } from 'react-router-dom';
import Footer from './Footer'

export default function Sidebar({ isOpen} : {isOpen : boolean}) {
    
    return (
        /* `fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
         md:relative md:translate-x-0 md:flex` */
        <aside className={`${isOpen === false && 'hidden fixed'} w-64 bg-gray-900 text-white p-6 md:relative md:flex flex-col justify-between overflow-y-auto`}>
            <div>
                <h2 className='text-xl font-bold mb-6'>Finance App</h2>
                <nav className='space-y-2 flex flex-col'>
                    <Link to="/">Dashboard</Link>
                    <Link to="/transactions">Transactions</Link>
                    <div className='text-gray-400 mt-4 text-sm tracking-wider'>FEATURES</div>
                    <Link to="/investments">Investments</Link>
                    <Link to="/bills">Bills</Link>
                    <Link to="/expenses">Expenses</Link>
                    <Link to="/goals">Goals</Link>
                    <Link to="/splitwise">Splitwise</Link>
                </nav>
            </div>

            <div className='text-center'>
                <hr className='my-4 border-gray-700'/>
                <Link to="/profile" className='text-gray-400 hover:text-white text-sm'>View Profile</Link>
                <Link to="/settings" className='text-gray-400 hover:text-white text-sm ml-4'>Settings</Link>
                <hr className='my-4 border-gray-700'/>
                <Footer />
            </div>
        </aside>
    )
}