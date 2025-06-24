const API = `http://localhost:4000`
import { Transaction } from "../context/types/TransactionType"
const token = localStorage.getItem('tokenFinanceApp')

export const getTransactions = async () => {
    const response = await fetch(`${API}/api/transactions`, {
        method: "GET",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
}

export const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    const response = await fetch(`${API}/api/transactions`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({transaction})
    })

    return response.json()
}

export const deleteTransaction = async (id: number) => {
    try{
        const response = await fetch(`${API}/api/transactions/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok) {
            throw new Error(`Failed to delete transaction with id ${id}`)
        }
        
        console.log(`Transaction with id ${id} deleted`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}