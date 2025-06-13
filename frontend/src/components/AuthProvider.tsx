import React, { useState } from "react";
import { AuthContext, AuthContextType } from "../AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

// Simple Mock auth -> Simulates authentication
const MOCK_USERS = new Map<string, string>(); 

export function AuthProvider({ children }: AuthProviderProps ) {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try{
            // Simulate the API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Check if user exists and password matches
            const storedPassword = MOCK_USERS.get(email);
            if (storedPassword && storedPassword === password) {
                setUser(email);
                return true
            }
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true)
        try {
            await new Promise( resolve => setTimeout(resolve, 1000))

            if( MOCK_USERS.has(email)){
                return false // user laready exists
            }

            MOCK_USERS.set(email, password);
            setUser(email);
            return true
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
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
