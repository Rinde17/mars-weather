import React, { createContext, useState, useEffect } from 'react';
import { UserInterface } from "../interfaces/UserInterface";
import { User } from "../types/UserType";
import { UserProviderProps } from "../types/UserProviderProps";
import { onAuthStateChanged } from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const defaultStage = {
    user: {
        uid: '',
        email: '',
        last_name: '',
        first_name: ''
    },
    setUser: (user: User) => {}
} as UserInterface
export const AuthContext = createContext(defaultStage);

export const AuthProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        uid: '',
        email: '',
        last_name: '',
        first_name: ''
    });

    useEffect(() => {
        const unsubscride = onAuthStateChanged(auth, async (currentUser) => {

            // faire un get dans firestore pour le last_name et le first_name
            const q = query(collection(firestore, "Users"), where("uid", "==", currentUser?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setUser({
                uid: currentUser?.uid || '',
                email: currentUser?.email || '',
                last_name: data.last_name || '',
                first_name: data.first_name || '',
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