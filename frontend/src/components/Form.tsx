import { useState, type ChangeEvent, type FormEvent } from "react";
import { Transactions } from "./Transactions";

interface FormProps {
    onAddTransaction: (data: Omit<Transactions, "id">) => void;
}

function Form({onAddTransaction} : FormProps) {

    const [state, setState] = useState({
        title: '',
        amount: '',
        category: '',
        type: 'Expense',
        transactionDate: new Date().toISOString().split('T')[0] // Default to today's date
    })

    const [errors, setErrors] = useState({
            title: '',
            amount: '',
            category: ''
    })

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target
        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()

        const newErrors =  {
            title: state.title ? '' : 'Title is required',
            amount: state.amount.trim() === '' || isNaN(Number(state.amount)) ? 'Valid amount required' : '',
            category: state.category? '' : 'Category is required'
        }

        setErrors(newErrors)

        // Turns the values in an array, then gets true is any value is not ''
        const hasErrors = Object.values(newErrors).some(error => error); 
        if(hasErrors) return

        console.log('Submitting transaction:', state)

        onAddTransaction({
            ...state,
            amount: Number(state.amount) // if no erros, than convert to number
        })

        // Reset the from and the error checking.
        setState({
            title: '',
            amount: '',
            category: '',
            type: 'Expense',
            transactionDate: new Date().toISOString().split('T')[0] // Reset to today's date
            // the userID here
        })

        setErrors({ 
            title: '', 
            amount: '', 
            category: ''
        });
    }

    return (
        <div className="border border-black p-4 m-2 rounded-lg bg-blue-100 text-black">
            <form onSubmit={handleSubmit}>
                <label className="text-black"> 
                    Transaction
                    <input
                        type="text"
                        name="title"
                        placeholder={errors.title ? errors.title : 'Transaction' }
                        className="text-black"
                        value={state.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="amount"
                        value={state.amount}
                        placeholder={errors.amount ? errors.amount : '0' }
                        className="text-black"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="category"
                        value={state.category}
                        placeholder={errors.amount ? errors.amount : 'Category' }
                        className="text-black"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <select 
                        name="type"
                        value={state.type}
                        onChange={handleChange}
                        className="text-black"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </label>
                <label>
                    <input
                        type="date"
                        name="transactionDate"
                        value={state.transactionDate}
                        className="text-black"
                        onChange={handleChange}
                    />
                </label>
                <button
                    className="text-white" 
                    type='submit'
                >
                    Add income/expense
                </button>
            </form>
        </div>
    )
}

export default Form;