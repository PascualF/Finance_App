import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { TransactionsProvider } from '../context/TransactionsProvider'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
}

export default function Layout() {

    const location = useLocation()

    return (
        <TransactionsProvider>
            <div className='flex h-screen border-solid w-full max-w-screen overflow-hidden'>
                <Sidebar />

                {/* Main Content below */}
                <div className='flex flex-col border-solid w-full max-w-screen overflow-y-auto'>
                    <Header currentRoute={location.pathname}/>
                    <main className='flex-1 bg-blue-100 overflow-y-auto px-4'>
                        <Outlet /> {/* Will render routes content area and other components to be shown in the 'dashboard' */}  
                    </main>
                </div>
            </div>
        </TransactionsProvider>
    )
}
