import {Trash2} from 'lucide-react'
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

    const {transactions, isLoading, add, remove } = useTransactions()

    if (isLoading) return <div>Loading...</div>

    async function handleAdd(data: Omit<Transactions, "id">){
        console.log('Adding transaction:', data)
        await add(data)
    }

    async function handleDelete(data: Transactions) {
        await remove(data)
    }

    return (
        <div>
            {transactions.map(transaction => (
                <div key={transaction.id} className="flex flex-row justify-between items-center bg-blue-100 text-black p-2 mb-1 rounded">
                    <p>{transaction.title}</p>
                    <p>
                       {transaction.type === 'expense' ? '-' : '+'}{transaction.amount}
                    </p>
                    <p>{transaction.amount}</p>
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