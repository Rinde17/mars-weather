import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {firestore} from "../firebase";
import {setDoc, doc} from "firebase/firestore";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [ lastName, setLastName ] = useState(user.last_name);
  const [ firstName, setFirstName ] = useState(user.first_name);

  const handleUpdate = async () => {

    const usersRef = doc(firestore, 'Users', user.uid);
    await setDoc(usersRef, {
      uid: user.uid,
      last_name: lastName ? lastName : user.last_name,
      first_name: firstName ? firstName : user.first_name,
      email: user.email
    });


    // const q = query(collection(firestore, "Users"), where("uid", "==", user?.uid));
    // const doc = await getDocs(q);
    // const data = doc.docs[0].data();
    //
    // await updateDoc(doc.docs[0], {
    //   last_name: lastName,
    //   first_name: firstName
    // });

  }

  return (
    <div className="container">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card p-4">
            <div className="card-header text-center">
              <h1>Profile</h1>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor={"email"}>Email</label>
                <input type="email" className="form-control" id={"email"}
                       value={user.email} disabled={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor={"last_name"}>Nom</label>
                <input type="text" className="form-control" id={"last_name"}
                       defaultValue={user.last_name}
                       onChange={e => setLastName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label htmlFor={"first_name"}>Prénom</label>
                <input type="text" className="form-control" id={"first_name"}
                       defaultValue={user.first_name}
                       onChange={e => setFirstName(e.target.value)}/>
              </div>
            </div>
            <button className="btn btn-danger btn-block" onClick={handleUpdate}>Modifier infos</button>
          </div>
        </div>
      </div>

      {/*<div>*/}
      {/*  <h1>Profile</h1>*/}
      {/*  <div>*/}
      {/*    { user.email }*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    { user.last_name }*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    { user.first_name }*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    { user.uid }*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default Profile;