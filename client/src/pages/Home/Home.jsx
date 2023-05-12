import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { Image } from "../../components/index";

import "../Home/Home.scss";


const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const dummyPlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => { 
    setLoading(true);
    axios.get("/api/places/allplaces")
      .then(({data}) => {
        setPlaces(data);
        setLoading(false);
      }).catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <section className='home--page'>
        {loading ? (
        <div className="places--grid">
          {dummyPlaces?.map((place, index) => (
            <div key={place + index} style={{
              height: "300px",
              background: "#aaa"
            }} className="grid-item">
              
            </div>
          ))}
        </div>
        ) : (
        <div className='places--grid'>
          {places.length > 0 && places.map(place => {
          const { _id, title, photos, address, description, price } = place;
          return (
            <Link to={"/place/"+_id} key={title + description} className="grid-item">
              <div className="image">
                {photos?.[0] && (
                  <Image
                    // src={"http://localhost:5000/uploads/" + photos[0]} alt=""
                    src={photos[0]}
                  />
                )}
              </div>
              <div className="text--content">
                <h3 className="title">{title}</h3>
                <h4 className="address">{address}</h4>
                <p className="price">$ {price} <span>night</span></p>
              </div>
            </Link>
          )
        })}
        </div>
        )}
    </section>
  )
}

export default Home;
