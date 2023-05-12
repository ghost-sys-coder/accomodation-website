import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AccountNav, Perks, PhotoUploader } from "../../components/index";
import axios from "axios";
import "../PlacesForm/PlacesForm.scss";

const PlacesForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    /**
     * ! MANAGING STATE FOR THE FORM
     */

      const [title, setTitle] = useState("");
      const [address, setAdress] = useState("");
      const [addedPhotos, setAddedPhotos] = useState([]);
      const [description, setDescription] = useState("");
      const [perks, setPerks] = useState([]);
      const [extraInfo, setExtraInfo] = useState("");
      const [checkIn, setCheckIn] = useState("");
      const [checkOut, setCheckOut] = useState("");
      const [maxGuests, setMaxGuests] = useState(1);
      const [price, setPrice] = useState(100);
  
    /**
     * ! Creates a new place
     */
      async function savePlace(event) {
          event.preventDefault();
          
          const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,
            price
          }
          if (id) {
              /** PUT -- updating an existing place */
              const response = await axios.put("/api/places/addplaces", {
                id, ...placeData
            });
     
            if (response.statusText === "OK") {
                navigate("/account/places")
            }
          } else {
              /** POST a new place */
            const response = await axios.post("/api/places/addplaces", {
                ...placeData
            });
     
            if (response.statusText === "OK") {
                navigate("/account/places")
            }
          }
    }
    
    /**
     * ! This Updates the information of an existing place
     */

    useEffect(() => { 
        if (!id) return;
        axios.get("/api/places/" + id)
            .then(({ data }) => {
                console.log(data)
                setTitle(data.title);
                setAdress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price)
        })
    }, [id])
 
  return (
    <div className='places--form'>
        <AccountNav />
        <div className="form-container">
            <form onSubmit={savePlace} className="form">
                <label htmlFor="title" className="form--label">title</label>
                <p className="title-desc">The title for your place should be short and catchy</p>
                <input type="text" id='title' placeholder='title for your place: should be short and catchy'
                value={title}
                onChange={event => setTitle(event.target.value)}
                />
                <label htmlFor="address" className="form--label">address</label>
                <p className="title-desc">Address to this place</p>
                      <input type="text" id='address' placeholder='address'
                          value={address}
                          onChange={event => setAdress(event.target.value)}
                      />

                <PhotoUploader 
                    addedPhotos={addedPhotos}
                    setAddedPhotos={setAddedPhotos}
                />
                
                <label htmlFor="description" className="form--label">description</label>
                <p className="title-desc">Description of the place</p>
                      <textarea
                          name="description"
                          id="description"
                          cols="20" rows="5"
                          placeholder='leave a description...'
                          value={description}
                          onChange={event => setDescription(event.target.value)}
                      />
                
                <Perks selected={perks} onChange={setPerks} />
                      
                      
                <label htmlFor="extra-info" className="form--label">Extra Info</label>
                <p className="title-desc">house rules, etc</p>
                      <textarea
                          name="extra-info"
                          id="extra-info"
                          cols="30" rows="5"
                          value={extraInfo}
                          onChange={event => setExtraInfo(event.target.value)}
                      />
                <h3 className="title">Check in & out times</h3>
                <p className="title-desc">Add check in and out times</p>
                <div className="grid">
                    <div className="grid--item">
                        <label htmlFor="checkin">Check in time</label>
                              <input
                                  type="text" id='checkin'
                                  placeholder='22:00hrs' 
                                  value={checkIn}
                                  onChange={event => setCheckIn(event.target.value)}
                                  />
                    </div>
                    <div className="grid--item">
                        <label htmlFor="checkout">Check out time</label>
                              <input
                                  type="text"
                                  id="checkout"
                                  placeholder="10:00hrs"
                                  value={checkOut}
                                  onChange={event => setCheckOut(event.target.value)}
                              />
                    </div>
                    <div className="grid--item">
                        <label htmlFor="guests">Max number of guests</label>
                        <input 
                        type="number" 
                        value={maxGuests}
                        onChange={event => setMaxGuests(event.target.value)}
                         />
                    </div>
                    <div className="grid--item">
                        <label htmlFor="guests">Price Per Night</label>
                        <input 
                        type="number" 
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                         />
                    </div>
                </div>
                <button type='submit'>Save</button>
            </form>
    </div>
    </div>
  )
}

export default PlacesForm