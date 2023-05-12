import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { GoLocation } from "react-icons/go";
import { FaMoon, FaMoneyCheckAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { differenceInCalendarDays, format } from "date-fns";
import { AiOutlineArrowRight } from "react-icons/ai";

import { Image } from "../../components/index";



import "../BookingPage/BookingPage.scss";

const BookingPage = () => {
  const [booking, setBooking] = useState('');
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      axios.get("/api/bookings/accountbookings")
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          console.log(foundBooking)
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
    }
  }, [id])
  
  if (!booking) {
    return;
  }
  const { price, checkIn, checkOut } = booking;
  const { title, address, photos } = booking.place;

  return (
    <section className="booking--page">
      <h1>{title}</h1>
      <p><GoLocation /> <span>{address}</span></p>
      <div className="booking--info">
        <h2>Your booking information</h2>
        <div className="content">
          <div className="left">
            <p className="nights">
              <FaMoon />
              <span>{differenceInCalendarDays(new Date(checkOut), new Date(checkIn))} Nights:</span>
            </p>
            <p className="date">
              <BsCalendarDate />
              <span>{format(new Date(checkIn), "yyyy-MM-dd")}</span>
            </p>
            <AiOutlineArrowRight style={{fontSize: "2rem"}} />
            <p className="date">
              <BsCalendarDate />
              <span>{format(new Date(checkOut), "yyyy-MM-dd")}</span>
            </p>
          </div>
          <p className="price">
            <span>Total Price:</span>
            <span>{price}</span>
          </p>
        </div>
      </div>
      <div className="image--grid">
        {photos.length > 0 && photos.map((photo, index) => (
          <div key={photo + index} className="image">
            <Image
              // src={"http://localhost:5000/uploads/" + photo} alt=""
              src={photo}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BookingPage