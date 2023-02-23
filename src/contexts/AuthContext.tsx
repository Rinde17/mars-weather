import React, { createContext, useState, useEffect } from 'react';
import { UserInterface } from "../interfaces/UserInterface";
import { User } from "../types/UserType";
import { UserProviderProps } from "../types/UserProviderProps";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const defaultStage = {
    user: {
        uid: '',
        email: ''
    },
    setUser: (user: User) => {}
} as UserInterface
export const AuthContext = createContext(defaultStage);

export const AuthProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        uid: '',
        email: ''
    });

    useEffect(() => {
        const unsubscride = onAuthStateChanged(auth, (currentUser) => {
            setUser({
                uid: currentUser?.uid || '',
                email: currentUser?.email || ''
            });
        })

        return unsubscride;
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}