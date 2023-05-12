const { Router } = require("express");
const router = Router();
const { bookPlace, getAccountBookings } = require('../controllers/bookingController');


/** handling booking routes  */

/** POST user booking info */
router.post("/bookplace", bookPlace);

/** GET all user account bookings */
router.get("/accountbookings", getAccountBookings)



module.exports = router;
