import {useContext, useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth, firestore } from '../firebase';
import {AuthContext} from "../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";

const RegisterForm: React.FC = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

            if (result.user) {
                setUser({
                    uid: result.user.uid,
                    email: result.user.email || '',
                    last_name: registerLastName || '',
                    first_name: registerFirstName || '',
                });

              await addDoc(collection(firestore, "Users"), {
                uid: result.user.uid,
                last_name: registerLastName,
                first_name: registerFirstName,
                email: result.user.email,
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
              <h1>Inscrivez-vous</h1>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor={"last_name"}>Nom</label>
                <input type="text" className="form-control" id={"last_name"}
                       onChange={e => setRegisterLastName(e.target.value)}
                       placeholder={"Votre nom"}/>
                <label htmlFor={"first_name"}>Adresse e-mail</label>
                <input type="text" className="form-control" id={"first_name"}
                       onChange={e => setRegisterFirstName(e.target.value)}
                       placeholder={"Votre prénom"}/>
              </div>
              <div className="form-group">
                <label htmlFor={"email"}>Adresse e-mail</label>
                <input type="email" className="form-control" id={"email"}
                       onChange={e => setRegisterEmail(e.target.value)}
                       placeholder={"Entrez votre adresse e-mail"}/>
              </div>
              <div className="form-group">
                <label htmlFor={"password"}>Mot de passe</label>
                <input type="password" className="form-control" id={"password"}
                       onChange={e => setRegisterPassword(e.target.value)}
                       placeholder={"Entrez votre mot de passe"}/>
              </div>
            </div>
            <button className="btn btn-danger btn-block" onClick={handleRegister}>Inscription</button>
          </div>
        </div>
      </div>

      {/*<div>*/}
      {/*  <h1>Register Form</h1>*/}

      {/*  <div>*/}
      {/*    <input type="email" onChange={e => setRegisterEmail(e.target.value)} />*/}
      {/*    <input type="password" onChange={e => setRegisterPassword(e.target.value)} />*/}
      {/*    <button onClick={handleRegister}>Register</button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default RegisterForm;