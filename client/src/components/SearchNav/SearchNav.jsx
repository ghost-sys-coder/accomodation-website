import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DateRange } from "react-date-range";
import { FaSearch, FaPaperPlane, FaBars, FaUserCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { UserContext } from "../../context/userContext";
import { SearchContext } from "../../context/searchContext";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file



const SearchNav = ({ isFormOpen, setIsFormOpen }) => {
    const {
        destination, checkIn, checkOut, guests,
        setDestination, setCheckIn, setCheckOut, setGuests,
        apartmentSearch
    } = useContext(SearchContext);

    const [openDate, setOpenDate] = useState(false);
    const handleOpenDate = () => {
        setOpenDate(prev => !prev)
    }
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        },
    ]);
    const [isActive, setIsActive] = useState({
        activeComponent: null,
    });

    const toggleActive = (index) => {
        setIsActive({...isActive, activeComponent: isActive.components[index]})
    }

    const toggleActiveStyles = (index) => {
        if (isActive.components[index] === isActive.activeComponent) {
            return "input--box active"
        } else {
            return "input--box"
        }
    }
    

    const { user } = useContext(UserContext);

    useEffect(() => {
        const handleClose = (event) => {
            if (event.srcElement.className === "search__form--container") {
               setIsFormOpen(false)
           }
        }
        document.body.addEventListener("click", handleClose);

        return () => document.body.removeEventListener("click", handleClose);
    }, [])

/**
 * ! Make an API call 
 */

    
  return (
    <header className={isFormOpen ? 'search__form--container': "display-none"}>
        <nav>
        <Link to={"/"} className="logo">
        <FaPaperPlane />
        <span className='logo--text'>airStaar</span>
        </Link> 
        <Link className='link' to="/">AirStaar Your Home</Link>
        <div className="profile">
            <div id='menu'>
            <FaBars />
            </div>
            <div className='user'>
            <FaUserCircle />
            </div>
            <div className="username">
                {user && (
                    <h1>{user.username}</h1>
                )}
            </div>
        </div>
        </nav>
        
          <div className="form--search">
              <form className="search--form">
                <div className="content--box">
                    <h3>Where</h3>
                    <div className="input--box">
                        <input type="text" placeholder='Search destinations...' id="destination" />
                    </div>
                </div>
                <div className="content--box">
                    <h3>Check In</h3>
                    <p onClick={handleOpenDate}>{format(date[0].startDate, "yyyy-MM-dd")}</p>
                </div>
                <div className="content--box dates">
                    <h3>Check Out</h3>
                    <p>{format(date[0].endDate, "yyyy-MM-dd")}</p>
                    {openDate && (
                        <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date-range"
                        />
                    )}
                </div>
                <div className="content--box">
                    <h3>Who</h3>
                    <p>Add Guests</p>
                </div>
                <div className="button">
                    <button>
                        <FaSearch />
                    </button>
                </div>
              </form>
          </div>

    </header>
  )
}

export default SearchNav