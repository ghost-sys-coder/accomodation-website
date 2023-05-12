/**
 * ! FOR VERCEL DEPLOYMENT, THE DATABASE CONNECTION MUST BE RUN IN EVERY SINGLE ROUTE THAT USES A DATABASE CONNECTION
 */
const connectDB = require("../database/db");

/** authentication controller */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const { handleErrors } = require("../helper/errors");
const { createToken, maxAge } = require("../helper/token");


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const postRegister = async (req, res) => {
    
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save();
        console.log(user)
        const token = createToken(user.id, req.body.username);
        res.cookie("air_token", token, { maxAge: maxAge * 1000, httpOnly: true });

        // const { _id, username, email } = user;
        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
               const token = createToken(user._id, user.username);
                res.cookie("air_token", token, { maxAge: maxAge * 1000, httpOnly: true })
                
                const { _id, username, email } = user;
               return res.status(200).json({_id, username, email})
            }
            throw Error("incorrect password")
        }
        throw Error("incorrect email")
        
        
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
    
}

const userProfile = (req, res) => {
    
    const { air_token } = req.cookies;
    if (air_token) {
        jwt.verify(air_token, process.env.AIRBNB_TOKEN, {}, async (err, userInfo) => {
            if (err) throw err;
            const {username, email, _id} = await User.findById(userInfo.id)
            res.status(200).json({username, email, _id})
        })
    } else {
        res.json(null)
    }
    
}

const logout = (req, res) => {
    res.cookie("air_token", "", {
        maxAge: 1
    }).json("user logged out!!")
}

module.exports = {
    postRegister,
    postLogin,
    userProfile,
    logout
}

