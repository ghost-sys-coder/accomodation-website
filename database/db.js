const mongoose = require("mongoose");
mongoose.set("strictQuery", false);



/** setting up mongoDB database connection */

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Mongoose Connection running: ${dbConnection.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;