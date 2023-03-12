import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        { user.email }
      </div>
      <div>
        { user.last_name }
      </div>
      <div>
        { user.first_name }
      </div>
      <div>
        { user.uid }
      </div>
    </div>
  )
}

export default Profile;