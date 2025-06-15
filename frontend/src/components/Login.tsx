import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../useAuth"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const {login, isLoading} = useAuth()

    const handleSubmitLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("")

        if(!email || !password) {
            setError("Please fill all fields")
            return;
        }

        try {
            const success = await login(email, password)
            if(!success) {
                setError("Invalid email or password.")
            }
            if(success) {
                navigate("/")
            }
        } catch(error) {
            console.error(error)
            setError("An error occurrd. Please try again.")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmitLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {error && ( // Show error message below password input
                        <div className="mb-4 text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                        disabled={isLoading} // disabling during loading
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    <p className="mt-4 text-center text-sm">
                        No account?
                            <Link to="/signup" className="hover:underline mx-4">
                                 SignUp Now
                            </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}