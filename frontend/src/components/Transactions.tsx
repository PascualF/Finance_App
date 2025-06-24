import {Trash2} from 'lucide-react'
import Form from './Form'
import { useTransactions } from '../hooks/useTransactions'
import {format} from 'date-fns'
import FormDataCSV from './FromDataCSV'
import { confirmAlert } from 'react-confirm-alert'

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
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete this transaction?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        })
        /* await remove(data) */
        console.log(data)
    }

    return (
        <div className='bg-white p-4'>
            <div className='flex justify-between text-black font-semibold rounded-t border-b pb-2'>
                <span className='w-2/5'>Title</span>
                <span className='w-1/5'>Amount</span>
                <span className='w-1/5'>Category</span>
                <span className='w-1/5'>Date</span>
                <span className='w-1/5'>Delete</span>
            </div>
            {transactions.map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center bg-blue-100 text-black p-1 mb-0.5 rounded">
                    <p>{transaction.title}</p>
                    <p>
                       {transaction.type === 'expense' ? '-' : '+'}{transaction.amount}
                    </p>
                    <span>{transaction.category}</span>
                    <p>{format(new Date(transaction.transactionDate), "MMM-dd")}</p>
                    <button style={{color: 'white'}}
                            onClick={() => handleDelete(transaction)} 
                        >
                            <Trash2 size={13}/>
                    </button>
                </div>
                )
            )}
            <Form onAddTransaction={handleAdd}/>
            <div className='flex items-center justify-center mt-4'>
                <FormDataCSV />
            </div>
        </div>
    )
}