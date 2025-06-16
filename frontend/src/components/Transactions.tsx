import { useEffect, useState } from 'react'
import {Trash2} from 'lucide-react'
import { getTransactions, addTransaction, deleteTransaction } from '../api'
import Form from './Form'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
}

export default function Transactions() {

    const [transactions, setTransactions] = useState<Transactions[]>([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions()
                setTransactions(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    async function getNewTransactionFromForm(data: Omit<Transactions, "id">){
        try{
            const response = await addTransaction(data);
            setTransactions(prev => [...prev, response]);
        }  catch (error) {
            console.error("Failed to add transaction:", error)
        }
    }

    const handleDelete = (id: number) => {
        try{
            deleteTransaction(id)
            setTransactions(prev => prev.filter(t => t.id !== id))
        } catch (error) {
            console.error("Failed to delete transaction:", error)
        }
    }

    return (
        <div>
            {transactions.map(transaction => (
                <div key={transaction.id} className="flex flex-row justify-between items-center bg-blue-100 text-black p-4 mb-2 rounded">
                    <p>{transaction.title}</p>
                    <p>{transaction.amount}</p>
                    <button style={{color: 'white'}}
                            onClick={() => handleDelete(transaction.id)} 
                        >
                            <Trash2 size={13}/>
                    </button>
                </div>
                )
            )}
            <Form onAddTransaction={getNewTransactionFromForm}/>
        </div>
    )
}