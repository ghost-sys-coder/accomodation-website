import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CgMenuGridO } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { BookingWidget, Image } from "../../components/index";

import "../SinglePlacePage/SinglePlacePage.scss";


const SinglePlacePage = () => {
    const [place, setPlace] = useState("");
    const [showAllPhotos, setShowAllPhotos] = useState(false);  
    

    const { id } = useParams();
    useEffect(() => {
        if (!id) return;
        axios.get("/api/places/" + id)
            .then(response => {
                setPlace(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [id]);
    const { title, address, photos, description,checkOut, checkIn,maxGuests, price, extraInfo, _id } = place;

   
    const handleShowAllPhotos = () => {
        setShowAllPhotos(prev => {
            return !prev
        })
    }
    if (showAllPhotos) {
        return (
            <section className="show-photos">
                <h1>{title}</h1>
                <div onClick={handleShowAllPhotos} className="close-button">
                    <p>Close Photos</p>
                    <FaTimes />
                </div>
                <div className="image--grid">
                {photos?.map((photo, index)=> (
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
  return (
    <section className="place--page">
            <h1 className="title">{title}</h1>
            <p className="address"><GrLocation />{address}</p>
            <div className="place--image-grid">
              {photos?.slice(0,5).map((image, index) => (
                <div onClick={handleShowAllPhotos} key={image + index} className="image">
                  <Image
                    // src={'http://localhost:5000/uploads/' + image} alt=""
                    src={image}
                  />
                </div>
              ))}
                <div onClick={handleShowAllPhotos} className="button">
                  <CgMenuGridO />
                  <p className="text">More Photos</p>
                </div>
            </div>
            <div className="description--box">
              <div className="left">
              <h2>Listing Description</h2>
              <p className='description'>{description}</p>
              <p className="checkin">CheckIn: <span>{checkIn}</span></p>
              <p className="checkout">CheckOut: <span>{checkOut}</span></p>
              <p className="guests">Max Number of Guests: <span style={{ fontSize: "3rem", padding: "1rem" }}>{maxGuests}</span></p>
              </div>

              <BookingWidget price={price} place={place} />
              
            </div>
            
            <div className="extra--info">
              <h1>air<span>cover</span></h1>
              <p>{extraInfo}</p>
            </div>
    </section>
  )
}

export default SinglePlacePage