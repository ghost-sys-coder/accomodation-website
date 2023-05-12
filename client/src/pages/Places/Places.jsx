import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";



import axios from 'axios';
import { AccountNav, Image } from '../../components';
import "../Places/Places.scss";

const Places = () => {
  
  const navigate = useNavigate();
  
  const [places, setPlaces] = useState([]);
 

   
    /**
     * ! Get places
     */
        useEffect(()=>{
            axios.get("/api/places/getplaces")
                .then(response => {
                    setPlaces(response.data)
                })
        }, [])
       
  return (
    <main className='places'>
      <AccountNav />
      <div className="text--center">
        <p>List of all added places</p>
        <Link className='link' to={"/account/places/new"}><FaPlus /> Add new place</Link> 
      </div>
      <div className="places--grid">
      {places?.map(Place => {
          const { title, address, photos, description, _id } = Place;
          return (
            <Link to={`/account/places/${_id}`} key={title + description} className="place--item">
              <div className="image">
                {photos.length > 0 && (
                  <Image
                    // src={"http://localhost:5000/uploads/" + photos[0]} alt=""
                    src={photos[0]}
                  />
                )}
              </div>
              <div className="text--content">
                <h1 className="title">{title}</h1>
                <h2 className="address">{address}</h2>
                <p className="description">{description.slice(0, 150)}...</p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default Places