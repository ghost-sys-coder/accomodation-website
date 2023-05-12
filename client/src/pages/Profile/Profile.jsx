import React, { useContext } from 'react';
import { UserContext } from "../../context/userContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Places, AccountNav } from "../../components/index";
import axios from 'axios';


import "../Profile/Profile.scss";


const Profile = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /** logout function */
  const handleLogout = async () => {
     await axios.post("/api/auth/logout");
    navigate("/");
    setUser(null);
  }
  
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }
  
  
  
  return (
    <section className='account--page'>
      <AccountNav />

      {subpage === "profile" && (
        <div className="user--profile">
          <h3>Logged in as:</h3>
          <p>{user.username} <span>({user.email})</span></p>
          <button onClick={handleLogout} className="btn">logout</button>
        </div>
      )}

      {subpage === "places" && (
        <Places />
      )}
    </section>
  )
}

export default Profile