const express = require("express");
const reviewRouter = express.Router();
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
   const addedReview = await reviewModeling.create(req.body);
   const addTourReview = await tourModeling.findByIdAndUpdate({
        "_id" : addedReview["Tour"]
    }, 
    {
        reviewHistory: addedReview["_id"]   
    })
    
    res.status(200).json(successRes(addedReview))
}, 404)

reviewRouter.route("/")
    .get(getAllReviews)
    .post(protectRoute, createReview)

module.exports = reviewRouter

