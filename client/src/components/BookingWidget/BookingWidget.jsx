import React, { useState, useContext, useEffect, useRef } from 'react';
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../../context/userContext";

const BookingWidget = ({ price, place }) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    const dateInput = useRef(null);
    
    const navigate = useNavigate("");
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.username)
        }
    }, [user])

    /** calculate the number of days */
    let numberOfNights = 0;
    if (checkIn && checkOut) {
       numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookThisPlace = async (event) => {
        event.preventDefault();
       
       const response = await axios.post("/api/bookings/bookplace", {
            checkIn, checkOut, numberOfGuests,
            name, mobile, price,
            place: place._id,
            price: numberOfNights * place.price
       });
        
        const bookingID = response.data._id;

        if (response.status === 200) {
            navigate("/account/bookings"); 
        }
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        dateInput.current.setAttribute("min", today);
        // console.log(dateInput.current)
    }, [])
  return (
    <div className="right">
        <p className="price">Price: <span>${price}</span> per night</p>
        <form action="" className="form">
            <label htmlFor="checkin">Check In:</label>
              <input
                  type="date"
                  name="checkin"
                  id="checkin"
                  ref={dateInput}
                  value={checkIn}
                  onChange={event => setCheckIn(event.target.value)}
                  />
            <label htmlFor="checkout">Check Out:</label>
              <input
                  type="date"
                  name="checkout"
                  id="checkout"
                  value={checkOut}
                  onChange={event => setCheckOut(event.target.value)}
                  />
            <label htmlFor="guests">Number of Guests:</label>
            <input
                type="number"
                name="guests"
                id="guests"
                value={numberOfGuests}
                onChange={event => setNumberOfGuests(event.target.value)}
            />
            {numberOfNights > 0 && (
                <div className="user--extras">
                    <label htmlFor="name">Your Name:</label>
                      <input
                          style={{textTransform: "capitalize"}}
                          type="text" name='name' id='name' placeholder='Enter your name...'
                          value={name}
                          onChange={event => setName(event.target.value)}
                      />
                    <label htmlFor="tel">Telephone</label>
                      <input
                          type="tel" name="tel" id="tel" placeholder='(+1)-0256-345-256'
                          value={mobile}
                          onChange={event => setMobile(event.target.value)}
                      />
                </div>
            )}
            <button onClick={bookThisPlace} type='submit'>
                Book this place
                {numberOfNights > 0 && (
                    <span>@ ${numberOfNights * price}</span>
                )}
            </button>
        </form>
    </div>
  )
}

export default BookingWidget