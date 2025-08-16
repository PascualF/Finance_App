import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Footer from './Footer'

interface SidebarProps{
    isOpen: boolean;
    toggleSideBar: () => void;
}

export default function Sidebar({ isOpen, toggleSideBar} : SidebarProps) {
    const sidebarRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handleClickOutsideSidebar = (event: MouseEvent) => {
            if(sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
               toggleSideBar()
            }
        }

        if(isOpen){
            document.addEventListener("mousedown", handleClickOutsideSidebar)
        } else {
            document.removeEventListener("mousedown", handleClickOutsideSidebar)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSidebar)
        }
        
    },[isOpen, toggleSideBar])
    
    useEffect(() => {
        if(isOpen){
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        // clean up function
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    return (
        <aside 
            ref={sidebarRef} 
            className={`${isOpen ? 'fixed' : 'hidden'} h-screen w-64 bg-gray-900 text-white h-full p-6 md:fixed md:flex flex-col justify-between overflow-y-auto`}
        >
            <div>
                <Link to='/'><h2 className='text-xl font-bold mb-6'>Finance App</h2></Link>
                <nav className='space-y-2 flex flex-col'>
                    <Link to="/" onClick={toggleSideBar}>Dashboard</Link>
                    <Link to="/transactions" onClick={toggleSideBar}>Transactions</Link>
                    <hr className='my-4 border-gray-700'/>
                    <div className='text-gray-400 mt-4 text-sm tracking-wider'>FEATURES</div>
                    <Link to="/investments" onClick={toggleSideBar}>Investments</Link>
                    <Link to="/bills" onClick={toggleSideBar}>Bills</Link>
                    <Link to="/expenses" onClick={toggleSideBar}>Expenses</Link>
                    <Link to="/goals" onClick={toggleSideBar}>Goals</Link>
                </nav>
            </div>

            <div className='text-center'>
                <hr className='my-4 border-gray-700'/>
                <Link to="/profile" onClick={toggleSideBar} className='text-gray-400 hover:text-white text-sm'>View Profile</Link>
                <Link to="/settings" onClick={toggleSideBar} className='text-gray-400 hover:text-white text-sm ml-4'>Settings</Link>
                <hr className='my-4 border-gray-700'/>
                <Footer />
            </div>
        </aside>
    )
}