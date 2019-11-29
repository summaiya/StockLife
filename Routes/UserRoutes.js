const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
const {signup, login, protectRoute, restrictTo, resetPassword, forgotPassword, updatePassword} = require("./UserAuth/userAuth");
//Fail and Success Response==========================
const catchAsync = require("./controllers/catchAsync");
const successDataResponse = require("./controllers/successResponse");
//Fail and Success Response==========================
const ErrorClass = require("../util/ErrorClass");
const userModeling = require("../Model/userModeling");

//ROUTE HANDLE ASSISTANCE----------------------------------------------------------------------------------------------------------------
const findItem = (items, itemFind)=>{
        return items.find(element=>element["_id"]===itemFind);
}
const successDataRes = {
    status: 'success',
    length: userData.length,
    data: userData
}
const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}
const writeFileFunc = (HTTPMethods)=>{
    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(userData), (err)=>{
        if(err){
            console.log(`${HTTPMethods} is not successful. Error : ${err}`)
        }
    })
}

//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------
const getAllUser = catchAsync(async (req, res)=>{
    const User = await userModeling.find().select("+password");
     res.status(200).json(await successDataResponse(User));
}, 404)
const createUser = (req, res)=>{
    const newId =  userData[userData.length-1]["_id"] + 1;
    const newPack = Object.assign({"_id": newId}, req.body);
    userData.push(newPack);
    writeFileFunc('Create');
    res.status(201).json(successDataRes);    //SEND JSON version
}
const getUserInfo = (req, res)=>{
    const ans = findItem(userData, (req.params.id));
    if(ans === undefined){
        res.status(404).send(notFoundRes);
    }else{
        res.status(200).json(
            {
                status: 'success',
                data: ans
            }
        );
    }
}
const filterWhatToUpdate = (reqBody, ...ItemsKey)=>{
    let newObj = {};
    for (let [key, value] of Object.entries(reqBody)) {
        if(ItemsKey.includes(key)){
            newObj[key] = value
        }
    }
    return newObj
}
const updateUserDatafromUser = catchAsync(async (req, res, next)=>{
    //1) Filter if it contains password and direct to update password
        if(req.body.password || req.body.passwordConfirm){
            return next(new ErrorClass("You can't update password here!"), 404)
        }
        const user = await userModeling.findByIdAndUpdate(req.user.userId, filterWhatToUpdate(req.body, "name", "email", "photo"), {
            new: true,
            runValidators: true
        }); 
        
    //2) Update documents for current User
            res.status(200).json({
                status:"success",
                body: user
            })
}, 404)

const deleteUserInfo = (req, res)=>{
    const deletePack = findItem(userData,(req.params.id));
   if(deletePack !== undefined){
        userData.splice(userData.indexOf(deletePack), 1);
        writeFileFunc('DELETE')
        res.status(200).json(successDataRes)
   }
   else{
    res.status(404).json(notFoundRes)
   }
}

//Router------------------------------------------------------------------------------------------
/**
 * Functions: Forgot password sends email for temp generated token
 * Limited: to everyone
 */
userRouter.route("/forgotPassword")
    .post(forgotPassword)
/**
 * Functions: Reset Password after forgot password
 * Limited: to everyone
 */
userRouter.route("/resetPassword/:token")
    .post(resetPassword)
/**
 * Functions: Update password without (fogot password ==> reset password)
 * Limited: to everyone
 */
userRouter.route("/updatePassword")
    .patch(protectRoute, updatePassword)
/**
 * Functions: Sign up
 * Limited: to everyone
 */
userRouter.route('/signup')
    .post(signup)
/**
 * Functions: Login
 * Limited: To everyone
 */
userRouter.route("/login")
    .get(login)
/**
 * Functions: Get All Users
 * Limited: Only to admin
 */
userRouter.route('/')
    .get(protectRoute, restrictTo("admin"), getAllUser)
/**
 * Functions: Change Current User Info from user side
 * Limited: everyone
 */
userRouter.route("/updateUser-user")
    .patch(protectRoute, updateUserDatafromUser)
/**
 * Functions: Change, Delete, get single user
 * Limited: users and admins
 */
userRouter.route('/:id')
    .delete(protectRoute, restrictTo("admin"), deleteUserInfo)
    .get(getUserInfo)

module.exports = userRouter