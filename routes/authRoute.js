const { Router } = require("express");
const router = Router();

const { postRegister, postLogin, userProfile, logout } = require("../controllers/authController");

/** authentication routing */


/** POST Register route */
router.post("/register", postRegister);


/** POST Login route */
router.post("/login", postLogin);

/** GET Profile route */
router.get("/profile", userProfile)

/** POST Logout user */
router.post("/logout", logout)

module.exports = router;        