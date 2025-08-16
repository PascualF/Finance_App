/* import { LoaderIcon } from "lucide-react" */
import { useEffect, useState } from "react"
const token = localStorage.getItem("tokenFinanceApp")

interface DataReceived {
    id: number,
    symbol: string,
    data: Date,
    price: number,
    userId: null
}

export default function Investments() {

    const [data, setData] = useState<DataReceived[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getStockPrice(){
        try {
            const response = await fetch("http://localhost:4000/api/get_stock_price", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json();
            console.log(data.stockData)
            setData(data.stockData)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching stock price: ", error)
            setData(null)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getStockPrice()
    }, [])

    if(isLoading) return <p>Loading...</p>

    return(
        <div className="bg-white p-4 rounded-lg w-full text-black">
            <p>Investments</p>
            <p></p>
            <form action="">
                <label>
                    <input 
                    type="string"
                    name="symbol"
                    placeholder="AAPL"
                    />
                </label>
                <button className="text-white">Press me</button>
            </form>
            <div>
                {data && data.length > 0 ? (
                    <div>
                        {data.map((d) => (
                            <div key={d.id}>{d.symbol}: {d.price}</div>
                        ))}
                    </div>
                ) : (
                    <div>Go buy some stocks, etf's and cryptos</div>
                )}
            </div>
        </div>
    )
}