import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaPaperPlane, FaSearch, FaUserCircle } from "react-icons/fa";
import { UserContext } from '../../context/userContext';
import { SearchNav } from "../../components/index";

import "../Navbar/Navbar.scss";

const Navbar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  
  const { user } = useContext(UserContext);

  return (
    <header style={{
      position: "sticky",
      top: 0, left: 0, right: 0,
      width: "100%",
      backgroundColor: "#fff"
    }} className='navigation'>
      <Link to={"/"} className="logo">
        <FaPaperPlane />
        <span className='logo--text'>airStaar</span>
      </Link>
      
      <div className="search--container" onClick={() => setIsFormOpen(prev => !prev)}>
        <div className="search-item"><p className="text">anywhere</p></div>
 
        <div className="search-item"><p className="text">any week</p></div>

        <div className="guests-item">
          <p className="guests">Add guests</p>
          <div className="icon">
            <FaSearch />
          </div>
        </div>
      </div>

      {isFormOpen && (
        <SearchNav
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
        />
      )}
      
      <Link to={user ? "/account": "/login"} className="profile">
        <FaBars />
        <FaUserCircle />
        {user && (
          <div className="username">
            {user.username}
          </div>
        )}
      </Link>
    </header>
  )
}

export default Navbar