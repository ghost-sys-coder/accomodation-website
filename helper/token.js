/** create jsonwebtoken */
const jwt = require("jsonwebtoken");



const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, username) => {
    return (
        jwt.sign({ id, username }, process.env.AIRBNB_TOKEN, {
            expiresIn: maxAge
        })
    )
}


module.exports = {
    createToken,
    maxAge
}