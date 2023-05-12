import React, { useContext, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SearchContext } from "../../context/searchContext";
import "./SearchResults.scss";


const SearchResults = () => {
  const {
    searchData
  } = useContext(SearchContext);


  return (
    <section className='search--results'>
      <h1 className="heading">search results</h1>
      <div className={searchData.length > 1 ? "search--results-grid" : "single--item"}>
      {searchData.length > 0 && searchData.map(item => {
      const { title, photos, description, price } = item;
      return (
        <Link to={"/"} key={description} className="item">
          <div className="image">
            <img src={"http://localhost:5000/uploads/" + photos[0]} alt="" />
            <FaHeart />
          </div>
          <h1 className="title">{title}</h1>
          <p className="desc">{description.slice(0, 150)}</p>
          <p className="price">${price} <span>night</span></p>
        </Link>
        )
      })}
      </div>
    </section>
  )
}

export default SearchResults