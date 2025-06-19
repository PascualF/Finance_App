export interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    transactionDate: string; // ISO date string
}