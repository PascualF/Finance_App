import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { TransactionsProvider } from '../context/TransactionsProvider'
import { useState } from 'react'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
}

export default function Layout() {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const toggleSidebar = () => setIsOpen(!isOpen)
    console.log(isOpen)
    return (
        <TransactionsProvider>
            <div className='flex min-h-screen w-full'>
                {/* Sidebar: hidden on mobile, visible on md+ */}
                <Sidebar isOpen={isOpen} toggleSideBar={toggleSidebar}/>

                {/* Main Content below */}
                <div className='flex-1 bg-blue-100 overflow-y-auto'>
                    <Header currentRoute={location.pathname} toggleSidebar={toggleSidebar}/>
                    <main className='flex-1 md:ml-64 bg-blue-100 overflow-y-auto'>
                        <Outlet /> {/* Will render routes content area and other components to be shown in the 'dashboard' */}  
                    </main>
                </div>
            </div>
        </TransactionsProvider>
    )
}
