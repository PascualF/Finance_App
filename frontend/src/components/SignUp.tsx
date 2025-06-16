import React, { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../useAuth"

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const {signup, isLoading} = useAuth()

    const handleSubmitSignup = async (event: React.FormEvent) => {
        event.preventDefault()
        setError("") // Setting error blank

        if(!email || !password || !password) {
            setError("Please fill all fields")
            return 
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }

        if (password.length < 6) {
            setError("Password to short")
            return
        }

        try {
            const success = await signup(email, password)
            if(!success) {
                setError("Sign up failed. User might already exist.")
            }
            if(success){
                navigate("/")
            }
        } catch (error) {
            console.error(error)
            setError("An error occured. Try again.")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-black text-center">Sign Up</h2>
                <form onSubmit={handleSubmitSignup}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-black mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-black mb-2" htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-center text-black text-sm">
                    Already have an account?
                        <Link to="/login" className="text-blue-900 hover:underline mx-2">
                            Login Now
                        </Link>
                </p>
            </div>
        </div>
    )
}