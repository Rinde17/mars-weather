import { useContext, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import {auth, firestore} from '../firebase';
import { AuthContext } from "../contexts/AuthContext";
import { getDocs,collection, query, where } from "firebase/firestore";


const RegisterForm: React.FC = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            if (result.user) {

                // faire un get dans firestore pour le last_name et le first_name
                const q = query(collection(firestore, "Users"), where("uid", "==", result.user?.uid));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();

                setUser({
                    uid: result.user.uid,
                    email: result.user.email || '',
                    last_name: data.last_name || '',
                    first_name: data.first_name || '',
                });
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <div className="row min-vh-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <div className="card-header text-center">
                            <h1>Connectez-vous</h1>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor={"email"}>Adresse e-mail</label>
                                <input type="email" className="form-control" id={"email"}
                                       onChange={e => setLoginEmail(e.target.value)}
                                       placeholder={"Entrez votre adresse e-mail"}/>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor={"password"}>Mot de passe</label>
                                <input type="password" className="form-control" id={"password"}
                                       onChange={e => setLoginPassword(e.target.value)}
                                       placeholder={"Entrez votre mot de passe"}/>
                            </div>
                        </div>
                        <button className="btn btn-danger btn-block" onClick={handleLogin}>Connexion</button>
                    </div>
                </div>
            </div>

            {/*<div>*/}
            {/*    <input type="email" onChange={e => setLoginEmail(e.target.value)} />*/}
            {/*    <input type="password" onChange={e => setLoginPassword(e.target.value)} />*/}
            {/*    <button className="btn btn-danger" onClick={handleLogin}>Connexion</button>*/}
            {/*</div>*/}
        </div>
    )
}

export default RegisterForm;