import { createContext } from "react";

export interface AuthContextType {
    user: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email:string, password: string) => Promise<boolean>,
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);