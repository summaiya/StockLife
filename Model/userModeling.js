const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({
    name: {
        required: [true, "must have a name"],
        type: String
    },
    photo: {
        required: [true, "must have a photo"],
        type: String
    },
    email: {
        required: [true, "must have a email address"], 
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        unique: true,
        lowercase: true
    },
    password: {
        required: [true, "must have a password"],
        type: String
    },
    passwordConfirm: {
        required: [true, "must match the previous password"],
        type: String
    }
})

const User = new mongoose.model("User", userSchema);

module.exports = User;