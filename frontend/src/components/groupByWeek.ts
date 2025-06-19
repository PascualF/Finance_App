import { parseISO, startOfWeek, format } from 'date-fns';
import { Transaction } from '../context/types/TransactionType';


export default function groupByWeek(transactions: Transaction[]) {
    
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const weekly: Record<string, {income: number, expenses: number}> = {};

    /* const date = parseISO(transaction.transactionDate); */

    console.log('groupByWeek transactions:', transactions);

    transactions.forEach(transaction => {
        const date = parseISO(transaction.transactionDate);
        const weekStart = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd'); // Monday as the start of the week

        if(!weekly[weekStart]){
            weekly[weekStart] = { income: 0, expenses: 0 }; 
        }

        if(transaction.type === 'income') {
            weekly[weekStart].income += transaction.amount;
        } else {
            weekly[weekStart].expenses += transaction.amount
        }
    })


    return Object.entries(weekly).map(([week, values]) => ({
        week,
        ...values
    }))
}