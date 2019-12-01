const express = require("express");
const reviewRouter = express.Router();
const tourModeling = require("../Model/tourModeling");
const reviewModeling = require("../Model/reviewModeling");
const userModeling = require("../Model/userModeling");
const catchAsyncError = require("./controllers/catchAsync")
const ErrorClass = require("../util/ErrorClass");


const createReview = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    const {body} = req;
    if(!id || !body){
        return new ErrorClass("Please enter the url :id and fill the body field")
    }

    const currentReview = await reviewModeling.create(body);
    let currentInfo;

    if(body.category === "tour"){
        
        currentInfo = await tourModeling.findByIdAndUpdate(
            {
                "_id": id
            },
            {
                $push: { review : currentReview["_id"]}
            },
            {
                    new: true,
                    runValidators: true
            }
        )
    }
    else if (body.category === "user"){
        // const currentUserInfo = await userModeling.find({"_id": id});
        currentInfo = await userModeling.findByIdAndUpdate(
        {
            "_id": id
        },
        {
            $push: { review : currentReview["_id"]}
        },
        {
                new: true,
                runValidators: true
        })
    }
    //console.log(body.category, id)
    //const addTourReviews = await tourModeling.findById(id)
    res.status(200).json({
        status: "success",
        data: currentInfo
    })
}, 404)

reviewRouter.route("/:id")
    .post(createReview)
// reviewRouter.route("/tourReview/:id")
//     .post()
// reviewRouter.route("/userReview/:id")
//     .post()

module.exports = reviewRouter

