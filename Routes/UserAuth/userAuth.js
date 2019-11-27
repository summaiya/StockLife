const ErrorClass = require("../../util/ErrorClass");
const userModeling = require("../../Model/userModeling");
const successDataRes = require("../controllers/successResponse")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const catchAsync = require("../controllers/catchAsync")


//================================================================================
const jwtTokenGenerator = (userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET_PASS, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
//================================================================================
exports.login = catchAsync(async (req, res, next)=>{
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
            const jwtToken = jwtTokenGenerator(user["_id"])
            res.status(200).json(await successDataRes(user, jwtToken))
        }
}, 404)
//================================================================================
exports.signup = catchAsync(async(req, res, next)=>{
    const newUserData = await userModeling.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });  
    const jwtToken = jwtTokenGenerator(newUserData["_id"]);
    res.status(201).json(await successDataRes(newUserData, jwtToken))
}, 401)

exports.protectRoute = catchAsync(async (req, res, next)=>{
    let token;
    //1)Check if token exists (all tokens must start with "Bearer")
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.replace("Bearer ", "");//remove the "Bearer"
    }
    //2)validate the token (verify the signture is valid or not ===> verification)
    if(!token){
        return next(new ErrorClass("You must log in first", 401))
    }
    //3)Check if the user still exists
    const data = await jwt.verify(token, process.env.JWT_SECRET_PASS);
    console.log(data);
    
    //4)check if the password was changed
    console.log("I am in middleware man1");
    next();
}, 404)