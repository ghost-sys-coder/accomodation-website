/**
 * ! FOR VERCEL DEPLOYMENT, THE DATABASE CONNECTION MUST BE RUN IN EVERY SINGLE ROUTE THAT USES A DATABASE CONNECTION
 */
const connectDB = require("../database/db");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Places = require("../models/Place");

/** POST add places */
const addPlaces = async (req, res) => {

    const { air_token } = req.cookies;

    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

    try {
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            const placeDoc = await Places.create({
                owner: userInfo.id,
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            res.status(200).json(placeDoc)
        })
    } catch (err) {
        res.status(400).json({err})
    }
}

/**
 * ! Get places
*/
const getPlaces = async (req, res) => {

    const { air_token } = req.cookies;

    try {
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            const { id } = userInfo;
            const placeDoc = await Places.find({ owner: id });
            res.status(200).json(placeDoc)
        }) 
    } catch (err) {
        res.status(200).json({err})
    }
}

/**
 * ! Get place by its ID 
 */
const getPlaceById = async (req, res) => {

    const { id } = req.params;
    try {
        const placeDoc = await Places.findById(id);
        res.status(200).json(placeDoc);
    } catch (err) {
        res.status(200).json({ err });
    }
}

/**
 * ! Update place information
 */
const updatePlaceInfo = async (req, res) => {

    const { air_token } = req.cookies;
    
    try {
        const {
            id,
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        } = req.body;
        
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            const placeDoc = await Places.findById(id);
            if (placeDoc.owner.toString() === userInfo.id) {
                placeDoc.set({
                    title, address, photos: addedPhotos,
                    description, perks, extraInfo,
                    checkIn, checkOut, maxGuests, price
                });
                await placeDoc.save();
                res.status(200).json(placeDoc);
            }
        })
    } catch (err) {
        res.status(200).json({ err });
    }
}

/**
 * ! Get All Places
 */
const getAllPlaces = async (req, res) => {

    try {
        const allPlaces = await Places.find();
        res.status(200).json(allPlaces)
    } catch (err) {
        res.status(200).json({ err });
    }
}


/**
 * ! Search for places by location
 */

const postSearch = async (req, res) => {
    
    const { destination, checkIn, checkOut, guests } = req.query;

    try {
        const results = await Places.find({ 'address': {'$regex': destination, '$options': '1'} });
        res.status(200).json(results);
    } catch (err) {
        res.status(200).json({err})
    }
}

module.exports = {
    addPlaces,
    getPlaces,
    getPlaceById,
    updatePlaceInfo,
    getAllPlaces,
    postSearch
}