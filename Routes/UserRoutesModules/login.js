const ErrorClass = require("../../util/ErrorClass");
const userModeling = require("../../Model/userModeling");
const successDataRes = require(".././controllers/successResponse")
const bcrypt = require('bcryptjs');
const login = async (req, res, next)=>{
    const {email, password} = req.body;
    //1) Check if the email and password exists
    if(!email || !password){
        return next(new ErrorClass("We need both email and password, please try again!", 400))
    }
    //2)Check if user exists
    const user = await userModeling.find({email}).select("+password");
    //2.5) Check if email and password are correct
        /**
         * bcrypt.compare compare the unhashed password vs hashed password
         */
    const matchPassword = await bcrypt.compare(password, user[0].password);
    //3)send token to client;
        if(matchPassword === false || user === null){
            return next(new ErrorClass("Email or Password wasn't correct, please try again!", 400));
        }
        else{
            next(await successDataRes(user))
        }
}

module.exports = login