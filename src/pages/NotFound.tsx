import React from "react";
import {Link} from "react-router-dom";

const NotFound = (): JSX.Element => {

    return (
        <>
            <h1>Cette page n'existe pas !</h1>
            <h2>Veuillez retourner à <Link to="/">l'accueil</Link></h2>
        </>
    );

}

export default NotFound;