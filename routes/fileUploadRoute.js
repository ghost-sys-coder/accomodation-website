const { Router } = require("express");
const router = Router();

const multer = require("multer");
const uploadMiddleware = multer({ dest: "/tmp" });

const { fileUpload } = require("../controllers/fileUploadController");



router.post("/file", uploadMiddleware.array("files", 100) , fileUpload);


module.exports = router;