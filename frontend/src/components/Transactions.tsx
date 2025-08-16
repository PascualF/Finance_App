import {Trash2, Pen} from 'lucide-react'
import Form from './Form'
import { useTransactions } from '../hooks/useTransactions'
import {format} from 'date-fns'
import FormDataCSV from './FromDataCSV'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
  transactionDate: string, // ISO date string
}

export default function Transactions() {

    const {transactions, isLoading, add/* , remove */ } = useTransactions()

    if (isLoading) return <div>Loading...</div>

    async function handleAdd(data: Omit<Transactions, "id">){
        await add(data)
    }

    async function handleDelete(data: Transactions) {
        /* await remove(data) */
        console.log(data)
    }

    return (
        <div className='bg-white p-4'>
            <div>
                <p className='text-black'>This will be dates filter</p>
            </div>
            <div className='flex justify-between text-black font-semibold rounded-t border-b pb-2'>
                <span className='w-2/5 pl-3'>Title</span>
                <span className='w-1/5'>Amount</span>
                <span className='w-1/5'>Category</span>
                <span className='w-1/5'>Date</span>
                <span className='w-1/5'>Modify/Delete</span>
            </div>
            {/* For smaller screens, phones... */}
            <div className='md:hidden block'>
                {transactions.map(transaction => (
                    <div key={transaction.id} className="flex justify-between items-center bg-blue-100 text-black p-1 mb-0.5 rounded">
                        <span className='w-2/5 pl-2'>{transaction.title}</span>
                        <span className='w-1/5'>
                        {transaction.type === 'expense' ? '- ' : '+ '}{transaction.amount} €
                        </span>
                        <span className='w-1/5'>{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</span>
                        <span className='w-1/5'>{format(new Date(transaction.transactionDate), "dd-MMM-yy")}</span>
                        <span className='w-1/5'>
                            <button 
                                style={{color: 'white'}}
                            >
                                <Pen size={13}/>
                            </button>
                            <button 
                                style={{color: 'white'}}
                                onClick={() => handleDelete(transaction)} 
                            >
                                <Trash2 size={13}/>
                            </button>
                        </span>
                    </div>
                    )
                )}
            </div>

            {/* Above phones size, tablet, desktop, etc.... */}
            <div className='block'>
                {transactions.map(transaction => (
                    <div key={transaction.id} className="flex justify-between items-center bg-blue-100 text-black p-1 mb-0.5 rounded">
                        <span className='w-2/5 pl-2'>{transaction.title}</span>
                        <span className='w-1/5'>
                        {transaction.type === 'expense' ? '- ' : '+ '}{transaction.amount} €
                        </span>
                        <span className='w-1/5'>{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</span>
                        <span className='w-1/5'>{format(new Date(transaction.transactionDate), "dd-MMM-yy")}</span>
                        <span className='w-1/5'>
                            <button 
                                style={{color: 'white'}}
                            >
                                <Pen size={13}/>
                            </button>
                            <button 
                                style={{color: 'white'}}
                                onClick={() => handleDelete(transaction)} 
                            >
                                <Trash2 size={13}/>
                            </button>
                        </span>
                    </div>
                    )
                )}
            </div>
            <Form onAddTransaction={handleAdd}/>
            <div className='flex items-center justify-center mt-4'>
                <FormDataCSV />
            </div>
        </div>
    )
}