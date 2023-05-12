import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchContext = createContext({});

export const SearchContextProvider = ({children}) => {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1)

    const [searchData, setSearchData] = useState([]);
   
    const navigate = useNavigate();
    const apartmentSearch = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("destination", destination);
        formData.append("checkIn", checkIn);
        formData.append('checkOut', checkOut);
        formData.append("guests", guests);

        const response = await axios.get(`/api/places/location?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
        setSearchData(response.data)
      

        if (response.status === 200) {
            navigate(`/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
        } 
    }
    
   


    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            guests,
            searchData,
            setDestination, 
            setCheckIn,
            setCheckOut,
            setGuests,
            setSearchData,
            apartmentSearch
        }}>
            {children}
        </SearchContext.Provider>
    )
}