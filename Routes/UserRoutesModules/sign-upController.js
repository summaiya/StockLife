const UserModel = require("../../Model/userModeling");
const catchAsync = require("../controllers/catchAsync");
const successDataRes = require("../controllers/successResponse");
const signupUser = catchAsync(async(req, res, next)=>{
    const newUserData = await UserModel.create(req.body);
    //What is the difference?
    // console.log("//==========================================")
    // console.log('newUserData', newUserData)
    // console.log('req.body', req.body)
    // console.log("//==========================================")
    res.status(201).json(await successDataRes(newUserData))
}, 401)

module.exports = signupUser