const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        required: [true, "must have a name"],
        type: String
    },
    photo: {
        required: [true, "must have a photo"],
        type: URL
    },
    email: {
        required: [true, "must have a email address"], 
        type: String
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