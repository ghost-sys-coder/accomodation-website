import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Layout, Register, Login, Profile, Places, PlacesForm, SinglePlacePage, BookingPage, BookingsPage, SearchResults } from "./pages/index";

import { UserContextProvider } from './context/userContext';

import "./App.css";
import { SearchContextProvider } from './context/searchContext';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true; 


const App = () => {
  return (

    <BrowserRouter>
    <SearchContextProvider>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/account' element={<Profile />} />
          <Route path='/account/places' element={<Places />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<SinglePlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
          <Route path='/search' element={<SearchResults />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </SearchContextProvider>
    </BrowserRouter>
  )
}

export default App;