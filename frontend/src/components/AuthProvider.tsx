import React, { useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../AuthContext";
const API = `http://localhost:4000`

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps ) {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    // check if token exists
    useEffect(() => {
        const token = localStorage.getItem('tokenFinanceApp')
        if (token) {
            setUser('existing user')
        } else {
            setUser(null)
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try{
            // Optional simulation
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            const response = await fetch(`${API}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if(!response.ok) {
                return false
            }
            const data = await response.json()
            localStorage.setItem('tokenFinanceApp', data.token)

            console.log(data)

            setUser(email)

            return true

        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (email: string, password: string): Promise <boolean>=> {
        setIsLoading(true)
        try {
            const response = await fetch(`${API}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            })

            if(!response.ok) {
                return false
            }

            const data = await response.json()

            localStorage.setItem('tokenFinanceApp', data.token)
            
            return true

        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('tokenFinanceApp')
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        login,
        signup, 
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
