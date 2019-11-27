const UserModel = require("../../Model/userModeling");
const catchAsync = require("../controllers/catchAsync");
const successDataRes = require("../controllers/successResponse");
const jwt = require("jsonwebtoken");

const signupUser = catchAsync(async(req, res, next)=>{
    const newUserData = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });  
    const jwtToken = jwt.sign({userID: newUserData["_id"]}, process.env.JWT_SECRET_PASS, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(201).json(await successDataRes(newUserData, jwtToken))
}, 401)

module.exports = signupUser