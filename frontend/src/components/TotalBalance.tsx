
export default function TotalBalance() {
  return (
    <div className="p-2 m-1 text-black rounded-xl h-full w-full flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500">The total balance</p>
        <p className="text-3xl font-semibold text-green-600 mt-1">€0.00</p>
      </div>
      <p className="text-xs text-gray-400 mt-2">Last Updated: --</p>
    </div>
  )
}
