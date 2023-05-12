const { Router } = require("express");
const router = Router();
const { addPlaces, getPlaces, getPlaceById, updatePlaceInfo, getAllPlaces, postSearch  } = require("../controllers/placeControllers");

/** managing places */

/** managing all places for the visitors */
router.get("/allplaces", getAllPlaces);

/** search for places by location */
router.get("/location", postSearch);


/** managing user account placess */
router.post("/addplaces", addPlaces);

router.get("/getplaces", getPlaces);

router.get("/:id", getPlaceById);

router.put("/addplaces", updatePlaceInfo)






module.exports = router;