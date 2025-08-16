import { useTransactions } from "../hooks/useTransactions"

export default function TotalBalance() {

  const {transactions } = useTransactions()

  const totalBalance =  transactions.reduce((acc, curr) => {
      const amount = curr.type === 'expense' ? -curr.amount : curr.amount
      return acc + amount
  }, 0)

  return (
    <div className="p-2 m-1 text-black rounded-xl h-full w-full flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500">The total balance</p>
        <p className={`text-3xl font-semibold ${totalBalance < 0 ? 'text-red-500': 'text-green-600'} mt-1`}>€ {totalBalance.toFixed(2)}</p>
      </div>
      
      <p className="text-xs text-gray-400 mt-2">Last Updated: --</p>
    </div>
  )
}
