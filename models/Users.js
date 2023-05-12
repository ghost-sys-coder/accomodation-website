const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
        minlength: [6, "username cannot be shorter than 6 characters"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        minlength: [6, "Password cannot be shorter than 6 characters"]
    }
})

/** fire this function before the document is saved to the database */
// UserSchema.pre("save", async function(next) {
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds)
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

/** fire function after the document is saved to the database */
// UserSchema.post("save", (doc, next) => {
//     console.log("The user document has been saved to the database", doc);
//     next();
// })



const User = new mongoose.model("User", UserSchema);

module.exports = User;