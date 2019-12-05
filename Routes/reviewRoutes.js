const express = require("express");
const reviewRouter = express.Router({mergeParams: true});
const tourModeling = require("../Model/tourModeling");
const reviewModeling = require("../Model/reviewModeling");
const userModeling = require("../Model/userModeling");
const catchAsyncError = require("./controllers/catchAsync")
const ErrorClass = require("../util/ErrorClass");
const successRes = require("./controllers/successResponse");
const {protectRoute} = require("./UserAuth/userAuth");


const getAllReviews = catchAsyncError( async (req, res, next)=>{
    const allReviews = await reviewModeling.find();
    res.status(200).json(successRes(allReviews));
}, 404)

const createReview = catchAsyncError(async(req, res, next)=>{
    if(!req.body.Author) req.body.Author = req.user.userId;
    if(!req.body.Tour) req.body.Tour = req.params.tourId;
   const addedReview = await reviewModeling.create(req.body);
   await tourModeling.findByIdAndUpdate({
        "_id" : addedReview["Tour"]
    }, 
    {
        reviewHistory: addedReview["_id"]   
    })
    res.status(200).json(successRes(addedReview))
}, 404)

reviewRouter.route("/")
    .get(getAllReviews)
    .post(createReview)
    // "Author": "5de08081cd1a5a080c93f820",
    // 	"Tour": "5de45f39fe04de1724a17657"

module.exports = reviewRouter