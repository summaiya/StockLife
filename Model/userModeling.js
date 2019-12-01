const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    role: {
        type: String,
        enum: ["user", "admin", "guide"],
        default: "user"
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
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    review: {
        type: mongoose.Schema.ObjectId,//mongoose.Schema.ObjectId //Array
        ref: "Review"
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
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');//Generate a random Cryto String
  
    this.passwordResetToken = crypto
      .createHash('sha256') //hash algorithm
      .update(resetToken)
      .digest('hex');
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //We add 10 min on top of current time
    return resetToken;
  };

const User = new mongoose.model("User", userSchema);

module.exports = User;