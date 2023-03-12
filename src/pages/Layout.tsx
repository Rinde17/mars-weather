import React, {useContext} from 'react';
import {Outlet, Link, useNavigate} from "react-router-dom";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {AuthContext} from "../contexts/AuthContext";

const Layout = () => {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser({
                uid: '',
                email: '',
                last_name: '',
                first_name: ''
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    function isLogged() {
        if (user.uid !== '') {
            return (
                <ul className="navbar-nav me-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">{user.first_name}</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={"#"} onClick={handleLogout}>Déconnexion</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Connexion</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Inscription</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">MarsWeather</Link>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">
                                    Accueil
                                    <span className="visually-hidden">(current)</span>
                                </Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" href="#">Features</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                    <div className="d-flex">
                        {isLogged()}
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );

}

export default Layout;