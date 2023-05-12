const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const imageDownloader = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const fs = require("fs");

/** import routes */
const authRoute = require("./routes/authRoute");
const fileUploadRoute = require("./routes/fileUploadRoute");
const placesRoute = require("./routes/placesRoute");
const bookingRoute = require("./routes/bookingRoute");


/** import mongoose database  */
const connectDB = require("./database/db");

/** loading configuration */
dotenv.config({ path: "./config/config.env" });


/** initialize express app */
const app = express();
const port = process.env.PORT || 8000;

/** logging */
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

/** launc middleware */
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cors({
    credentials: true,
    // origin: ["http://127.0.0.1:5173"]
    // origin: "https://airstaar-mern-app.herokuapp.com"
    origin: 'https://accommodation-app.herokuapp.com'
}))




/**
 * ! UPLOADING PHOTOS INTO AMAZON S3
 */
const bucket = "frank-booking-app";

const uploadToS3 = async (path, originalFilename, mimetype) => {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });

    const parts = originalFilename.split(".");
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + "." + ext;

    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }));

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}


/** routes */

/**
 * ! Uploading Images By Links
 */
app.post("/api/linkuploads", async (req, res) => {
    connectDB();
    const { link } = req.body;
    
    const newName = "photo" + Date.now() + ".jpg";

       await imageDownloader.image({
            url: link,
            dest: '/tmp/' + newName
        });
    
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.status(200).json(url);
})
app.use("/api/auth", authRoute);
app.use("/api/fileupload", fileUploadRoute);
app.use("/api/places", placesRoute);
app.use("/api/bookings", bookingRoute);


/**
 * ! HEROKU DEPLOY CONFIGURATIONS 
 */

if (process.env.NODE_ENV === "production") {
    /** Set static folder */
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    });
}



/** running express app */
app.listen(port, () => {
    connectDB();
    console.log(`The server is running on port: ${port}`);
})




