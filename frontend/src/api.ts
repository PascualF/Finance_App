const API = `http://localhost:4000`
import { Transactions } from "./App"

export const getTransactions = async () => {
    const response = await fetch(`${API}/api/transactions`)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
}

export const addTransaction = async (transaction: Omit<Transactions, "id">) => {
    const response = await fetch(`${API}/api/transactions`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({transaction})
    })

    return response.json()
}

export const deleteTransaction = async (id: number) => {
    try{
        const response = await fetch(`${API}/api/transactions/${id}`, {
            method: "DELETE"
        })

        if(!response.ok) {
            throw new Error(`Failed to delete transaction with id ${id}`)
        }
        
        console.log(`Transaction with id ${id} deleted`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}