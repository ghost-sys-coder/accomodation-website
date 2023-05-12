import React from 'react'
import { BiRadio } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { CgScreen } from "react-icons/cg";
import { BsWifi, BsHandThumbsUp, BsFillHouseDoorFill } from "react-icons/bs";

const Perks = ({ selected, onChange }) => {
    function handleCbClicks(event) {
        const { checked, name } = event.target;
        if (checked) {
            onChange([...selected, name])
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }
  return (
    <>
    <h3 className="title">Perks</h3>
    <p className="title-desc">Select all the perks for your place</p>
    <div className="perks--grid">
        <label htmlFor="wifi">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("wifi")} name='wifi' id='wifi' />
                <BsWifi />
            <span>Wi-Fi</span>
        </label>
        <label htmlFor="parking">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("parking")} name="parking" id="parking" />
                <AiFillCar />
            <span>free parking space</span>
        </label>           
        <label htmlFor="tv">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("tv")} name="tv" id="tv" />
            <CgScreen />
            <span>TV</span>
        </label>
        <label htmlFor="radio">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("radio")} name="radio" id="radio" />
            <BiRadio />
            <span>radio</span>
        </label>
        <label htmlFor="pets">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("pets")} name="pets" id="pets" />
            <BsHandThumbsUp />
            <span>pets</span>
        </label>
        <label htmlFor="entrance">
            <input onClick={handleCbClicks} type="checkbox" checked={selected.includes("entrance")} name="entrance" id="entrance" />
            <BsFillHouseDoorFill />
            <span>private entrance</span>
        </label>
    </div>
    </>
  )
}

export default Perks