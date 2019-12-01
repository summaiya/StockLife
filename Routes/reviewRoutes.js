const express = require("express");
const reviewRouter = express.Router();
const tourModeling = require("../Model/tourModeling");

const createTourReview = (req, res, next)=>{
    const {id} = req.params;

    const addTourReviews = await tourModeling.findById(id)

}


reviewRouter.route("/tourReview/:id")
    .post()
reviewRouter.route("/userReview/:id")
    .post()



