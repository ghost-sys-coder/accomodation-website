import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi";
import { BsBuilding, BsBookshelf } from "react-icons/bs";
import { UserContext } from "../../context/userContext";

import "../AccountNav/AccountNav.scss";


const AccountNav = () => {
    const location = useLocation();
    const { pathname } = location;
    let pathnameParts = pathname.split("/");
    let subpage = pathnameParts?.[2];

    if (subpage === undefined) {
        subpage = "profile"
    }
    console.log(subpage)
   
    const {user, setUser, ready} = useContext(UserContext);

    const linkClasses = (type = null) => {
        let classes = "nav--link"
        if (type === subpage) {
          classes += " active"
        } else {
          classes += " inactive"
        }
        return classes;
    }
    
      if (!ready) {
        return (<h1>"Loading ..."</h1>)
      }
      if (ready && !user) {
        return navigate("/login");
      }
    
  return (
    <nav className="account__navbar">
        <Link className={linkClasses("profile")} to={"/account"}>  <HiOutlineUser /> My Profile</Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}><BsBookshelf /> My bookings</Link>
        <Link className={linkClasses("places")} to={"/account/places"}><BsBuilding /> My accomodations</Link>
    </nav>
  )
}

export default AccountNav