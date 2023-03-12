import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";
import Profile from "../pages/Profile";


const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (user.uid === '') {
        // Si l'utilisateur n'est pas connecté, je le redirige vers la page de connexion
        return <Navigate to='/login' state={{ from: location }} />
    }

    // Si l'utilisateur est connecté, alors je retourne le composant enfant
    return <Profile />
}

export default ProtectedRoute