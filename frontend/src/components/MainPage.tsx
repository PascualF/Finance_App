import { useEffect, useState } from 'react'
import {Trash2} from 'lucide-react'
import { getTransactions, addTransaction, deleteTransaction } from '../api'
import Form from './Form'
import Footer from './Footer'
import Header from './Header'

export interface Transactions {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
}

export default function MainPage() {

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
        <Header />


            {transactions.map(t => (
            <div key={t.id} className="flex flex-row justify-between items-center bg-gray-100 p-4 mb-2 rounded">
                <ul>
                <li>{t.title}</li>
                <li>{t.amount}</li>
                </ul>
                <button onClick={() => handleDelete(t.id)} ><Trash2 size={13}/></button>
            </div>
            )
            )}
            <Form onAddTransaction={getNewTransactionFromForm}/>

            <Footer />
            </div>
    )


}
