import { useContext, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { AuthContext } from "../contexts/AuthContext";

const RegisterForm: React.FC = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            if (result.user) {
                setUser({
                    uid: result.user.uid,
                    email: result.user.email || ''
                });
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Login Form</h1>

            <div>
                <input type="email" onChange={e => setLoginEmail(e.target.value)} />
                <input type="password" onChange={e => setLoginPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default RegisterForm;