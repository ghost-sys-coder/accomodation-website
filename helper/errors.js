/** handle errors */

const e = require("express");


const handleErrors = (err) => {
    console.log(err.code, err.message);

    let errors = {
        username: "", 
        email: "",
        password: ""
    }

    /** incorrect email */
    if (err.message === "incorrect email") {
        errors.email = "the email entered is incorrect"
    }

    /** incorrect password */
    if (err.message === "incorrect password") {
        errors.password = "the password provided is wrong"
    }
    
    /** duplicate error */
    if (err.code === 11000) {
        errors.username = "username already exists";
        errors.email = "email already exists";

        return errors;
    }

    /** validation errors */
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }


    return errors;
}


module.exports = {
    handleErrors
}