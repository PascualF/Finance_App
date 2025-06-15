import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'
import MainContent from './MainContentx'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
}

export default function Layout() {

    return (
        <div className='flex h-screen border-solid w-full max-w-screen'>
            <Sidebar />

            {/* Main Content below */}
            <div className='flex flex-col border-solid w-full max-w-screen'>
                <Header />
                <main className='flex-1 mx-2 bg-blue-100 px-4'>
                    <MainContent />
                </main>
                <Footer />
            </div>
        </div>
    )
}
