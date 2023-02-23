import {useContext, useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import {AuthContext} from "../contexts/AuthContext";

const RegisterForm: React.FC = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

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
      <h1>Register Form</h1>

      <div>
        <input type="email" onChange={e => setRegisterEmail(e.target.value)} />
        <input type="password" onChange={e => setRegisterPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}

export default RegisterForm;