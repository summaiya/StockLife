//Framework & Routes & Data Model---------------------------------
const express = require('express');
const tourRouter = express.Router();
const tourDataModel = require("../Model/tourModeling");
//Framework & Routes & Data Model---------------------------------

//-----------------Module Files-----------------------------------
const getAllTours = require("./TourRoutesModules/getAllTours");
const getStats = require("./TourRoutesModules/getStats");
const {top_five_cheap_and_best} = require("./TourRoutesModules/alising");
const successDataRes = require("./TourRoutesModules/successResponse");
//-----------------Module Files---------------------------------
//ROUTE HANDLE ASSISTANCE----------------------------------------------------------------------------------------------------------------
//GET DATA=======
const tourCollection = async ()=>{
    const collection = await tourDataModel.find(query);
    return collection;
}
//Get DATA=======
const notFoundRes = (error)=>{ 
    return {
    status: 'failed',
    message: 'NOT FOUND', 
    error
    }
}
//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------
//getAllTours Old Space
//Myspace---
const createPack = (req, res)=>{
    tourDataModel.create(req.body).then(async(data)=>{
        res.status(201).json(await successDataRes(data));
    }).catch(err=>{
        console.log(err);
        res.status(401).json(notFoundRes(err))
    })
}
const getSinglePack = async (req, res)=>{
    try{
        const ans = await tourDataModel.findById(req.params.id);
        res.status(200).json(
            {
                status: 'success',
                data: ans
            }
        );
    } catch(error){
        res.status(404).send(error);
    }
}
const updatePack = async (req, res)=>{
    try{
        const tour = await tourDataModel.findByIdAndUpdate({"_id": req.params.id}, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(tour)
    }catch(error){
        res.status(404).json(error)
    }
}
const deletePack = async (req, res)=>{
    try{
        const tourData = await tourDataModel.findByIdAndDelete({"_id": req.params.id});
        res.status(200).json( await successDataRes(tourData))
    }catch(error){
        res.status(404).json(error)
    }
}
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


module.exports = tourRouter;