const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
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
        type: String,
        select: false
    },
    passwordConfirm: {
        required: [true, "must match the previous password"],
        type: String,
        //ONLY WORKS WHEN SAVE OR CREATE
        validate: {
            validator: function(passwordConfirm){
                return passwordConfirm === this.password
            },
            message: "Password Doesn't Match"
        }
    }
})
userSchema.pre("save", async function encryptData(next) {
    //Before It saves, it goes here
        //1) Check if the password has modified
    if(this.isModified("password")){
        //2) HASH the password
        this.password = await bcrypt.hash(this.password, 12);
        //3) Remove the passwordConfirm
        this.passwordConfirm = undefined;
    }
    next();
})
const User = new mongoose.model("User", userSchema);

module.exports = User;