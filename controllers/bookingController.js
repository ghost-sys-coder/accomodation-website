/**
 * ! FOR VERCEL DEPLOYMENT, THE DATABASE CONNECTION MUST BE RUN IN EVERY SINGLE ROUTE THAT USES A DATABASE CONNECTION
 */
const connectDB = require("../database/db");


const jwt = require("jsonwebtoken");


/** booking a place */
const Booking = require('../models/booking');

const bookPlace = (req, res) => {

    const { air_token } = req.cookies;
    const {
        place, checkIn, checkOut, numberOfGuests, name, mobile, price
    } = req.body;
    
    try {
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            Booking.create({
                place, checkIn, checkOut, numberOfGuests, name, mobile, price, user: userInfo.id
            }).then((bookingDoc) => {
                res.status(200).json(bookingDoc)
            })
        })
    }catch(err) {
        res.status(200).json({err})
    }
}

const getAccountBookings = (req, res) => {
    
    const { air_token } = req.cookies;
    try {
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            const bookingDocs = await Booking.find({ user: userInfo.id }).populate("place");
            res.status(200).json(bookingDocs)
        })
    } catch (err) {
        res.status(200).json({err})
    }
}


module.exports = {
    bookPlace,
    getAccountBookings
}