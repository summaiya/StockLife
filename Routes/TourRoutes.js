//Framework & Routes & Data Model---------------------------------
const express = require('express');
const tourRouter = express.Router();
const tourDataModel = require("../Model/tourModeling");

//Framework & Routes & Data Model---------------------------------
//Error ================================
const catchAsync = require("./controllers/catchAsync");
const ErrorClass = require("../util/ErrorClass");
//Error ================================
//-----------------Module Files-----------------------------------
const getAllTours = require("./TourRoutesModules/getAllTours");
const getStats = require("./TourRoutesModules/getStats");
const {top_five_cheap_and_best} = require("./TourRoutesModules/alising");
const successDataRes = require("./controllers/successResponse");
const {createReview} = require("./reviewRoutes");
const {protectRoute} = require("./UserAuth/userAuth");
//-----------------Module Files---------------------------------
 //getAllTours Old Space
const createPack = catchAsync(async (req, res, next)=>{
    const createNewTour = await tourDataModel.create(req.body);
    res.status(201).json(await successDataRes(createNewTour));
}, 401)

const getSinglePack = catchAsync(async (req, res, next)=>{
        const tourPack = await tourDataModel.findById(req.params.id); //populate 1) the properties that you want to connects
        if (tourPack===null){
            return next(new ErrorClass("Item is not found", 404))
        }
        res.status(200).json(
            {
                status: 'success',
                data: tourPack
            }
        )
}, 404)

const updatePack = catchAsync(async (req, res, next)=>{
    const tour = await tourDataModel.findByIdAndUpdate({"_id": req.params.id}, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json(await successDataRes(tour))
}, 404)

const deletePack = catchAsync(async (req, res)=>{
    const tourData = await tourDataModel.findByIdAndDelete({"_id": req.params.id});
     res.status(200).json( await successDataRes(tourData))
}, 404)
//All Routes ----------------------------------------------------------------------------------------------------------------
tourRouter.route('/top-5-best-rating')
    .get(top_five_cheap_and_best, getAllTours)
tourRouter.route("/stats-rating")
    .get(getStats)
tourRouter.route('/')
    .get(getAllTours)
    .post(createPack)
tourRouter.route('/:id')
    .get(getSinglePack)
    .patch(updatePack)
    .delete(deletePack)
// tour/jdjkasdjasf/review
tourRouter.route("/:tourId/createReview")
    .post(protectRoute, createReview)
//createReview

module.exports = tourRouter;