const ErrorClass = require("../../util/ErrorClass");
const userModeling = require("../../Model/userModeling");
const successDataRes = require("../controllers/successResponse")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const catchAsync = require("../controllers/catchAsync");
const sendEmail = require("../../util/email");
const crypto = require('crypto');




//================================================================================
const jwtTokenGenerator = (userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET_PASS, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
const resetPasswordFunction = async (userData, password, passwordConfirm)=>{
    //3) Replace the input password to the current password
    userData.password = password;
    userData.passwordConfirm = passwordConfirm;
    userData.passwordResetToken = undefined;
    userData.passwordResetExpires = undefined;
    await userData.save();
   
    const newJWTToken = jwtTokenGenerator(userData["_id"])
    return newJWTToken
    
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
         * .compare compare the unhashed password vs hashed password
         */
    const matchPassword = await bcrypt.compare(password, user[0].password);
    //3)send token to client;
        if(matchPassword === false || user === null){
            return next(new ErrorClass("Email or Password wasn't correct, please try again!", 400));
        }
        else{ 
            const jwtToken = jwtTokenGenerator(user[0]["_id"])
            res.status(200).json(await successDataRes(user, jwtToken))
        }
}, 404)
//================================================================================
exports.signup = catchAsync(async(req, res, next)=>{
    const newUserData = await userModeling.create({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });  
    const jwtToken = jwtTokenGenerator(newUserData["_id"]);
    res.status(201).json(await successDataRes(newUserData, jwtToken))
}, 401)
//================================================================================
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
    //3)Check if the user exists of not
        const data = await jwt.verify(token, process.env.JWT_SECRET_PASS); 
        if(!data){
            return next(new ErrorClass("Wrong web token"), 401)
        }
    //4)check if the password was changed
    req.user = data;
    next();
}, 404);
//================================================================================
exports.restrictTo = (...roles)=>{
    return catchAsync(async (req, res,next)=>{
        const userData = await userModeling.findOne({ "_id" : req.user.userId})
            roles.forEach(el=>{
                if(el !== userData.role){
                    next(new ErrorClass(`You are not ${roles.join(" OR ")}. Therefore, you can't go here`), 403)
                }
            })
         next();
    }, 404)
}
//================================================================================
exports.resetPassword = catchAsync(async (req, res, next)=>{
    //1) Capture the Reset Token + filter
        const resetToken = req.params.token;
        if(!resetToken){
            return next(new ErrorClass("Please include the token to the URL"), 400)
            }
    //2) Encrypt the Reset token to see if it matches the this.passwordRestToken
        const crypoResetToken = crypto
            .createHash('sha256') //hash algorithm
            .update(resetToken)
            .digest('hex');

        const userData = await userModeling.findOne({
            "passwordResetToken":crypoResetToken,
            "passwordResetExpires": {$gt: Date.now()}
        }).select("+password")

        if(userData === null){
            return next(new ErrorClass("Token is expired"), 401)
        }
        
    //3) Replace the input password to the current password
    
    
    const newJWTToken = await resetPasswordFunction(userData, req.body.password, req.body.passwordConfirm)
    res.status(200).json({
        status: "success",
        token: newJWTToken
    })

}, 404)
//================================================================================
exports.forgotPassword = catchAsync(async (req, res, next)=>{
    const {email} = req.body
    //1) Get User Email to get user info
        const user = await userModeling.findOne({email})
        if(!user){
            return next(new ErrorClass("User Doesn't Exists", 404))
        }
    //2) Generate a new token
        const resetToken = user.createPasswordResetToken();
        console.log('resetToken', resetToken)
        await user.save({ validateBeforeSave: false });
    //3) Send it to the user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
        await sendEmail({
            to: user.email,
            from: 'TravelTour <traveltour@support.com>',
            subject: "Your password reset token has sent. Please set your password within 10 min",
            text:  `here is the reset URL ${resetURL}`
        })
        res.status(200).json({
            status: "success",
            message: "Token Sent To Email"
        })
}, 404)
//================================================================================
exports.updatePassword = catchAsync(async (req, res, next)=>{
    //1) Find the User using its id
    const currentUser = await userModeling.findOne({"_id": req.user.userId}).select("+password");
    //2) Check if current password is correct or not
    const matchPassword = await bcrypt.compare(req.body.currentPassword, currentUser.password);
    if(matchPassword === false){
        return next( new ErrorClass("Please enter the correct password before update the new password", 401))
    }
    //3) Reset the Password
    const newJWTToken = await resetPasswordFunction(currentUser, req.body.password, req.body.passwordConfirm)
    //4) Send the Response to the POSTMAN
    res.status(200).json({
        status: "success",
        token: newJWTToken
    })
}, 404)