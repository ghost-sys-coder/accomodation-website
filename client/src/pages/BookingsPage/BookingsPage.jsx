import React, { useState, useEffect } from 'react';
import { AccountNav, Image } from "../../components/index";
import axios from 'axios';
import { format, differenceInCalendarDays } from "date-fns";
import { AiOutlineArrowRight, AiFillCalendar } from "react-icons/ai";
import { FaMoon, FaMoneyCheck } from "react-icons/fa";

import "../BookingsPage/BookingsPage.scss";
import { Link } from 'react-router-dom';


const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { 
    axios.get("/api/bookings/accountbookings")
      .then(response => {
      setBookings(response.data)
    })
  }, [])
  
  return (
    <section className='bookings--page'>
      <AccountNav />
      <div className="bookings--grid">
        {bookings.length > 0 && bookings.map(booking => {
          const { name, checkIn, checkOut, place, price, _id } = booking;

          return (
            <Link to={"/account/bookings/"+_id} className={bookings.length > 1 ? "grid--item" : "single--item"}>
              <div className="image">
                <Image
                  // src={"http://localhost:5000/uploads/" + place.photos[0]} alt=""
                  src={place.photos[0]}
                />
              </div>
              <p className="dates"><span><AiFillCalendar />{format(new Date(checkIn), "yyyy-MM-dd")}</span> <AiOutlineArrowRight /> <span><AiFillCalendar />{format(new Date(checkOut), "yyyy-MM-dd")}</span></p>
              <p className="price"><FaMoneyCheck/> Total Price: ${price}</p>
              <p className="nights"><FaMoon />{differenceInCalendarDays(new Date(checkOut), new Date(checkIn))} Nights</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default BookingsPage