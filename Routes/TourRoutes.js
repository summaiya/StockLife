const express = require('express');
const fs = require('fs');
const tourRouter = express.Router();
const tourDataModel = require("../Model/tourModeling");

//-----------------Module Files---------------------------------
const getAllTours = require("./TourRoutesModules/getAllTours");
const successDataRes = require("./TourRoutesModules/successResponse");
//-----------------Module Files---------------------------------





// Get json file
const checkBody = (req, res, next)=>{
    if(req.body.name === undefined || req.body.price === undefined){
        res.status(400).json(notFoundRes);
        console.log('Need to include name and price')
    }
    else{
        console.log('Good Content, Keep on!')
        next();
    }
}

//ROUTE HANDLE ASSISTANCE----------------------------------------------------------------------------------------------------------------
//GET DATA=======
const tourCollection = async ()=>{
    const collection = await tourDataModel.find(query);
    return collection;
}
//Get DATA=======

const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}
//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------
//getAllTours Old Space
//Myspace---
const createPack = (req, res)=>{
    tourDataModel.create(req.body).then(async(data)=>{
        res.status(201).json(await successDataRes());
    }).catch(err=>{
        console.log(err);
        res.status(401).json(notFoundRes)
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
        res.status(200).json( await successDataRes())
    }catch(error){
        res.status(404).json(error)
    }
}
//All Routes ----------------------------------------------------------------------------------------------------------------

tourRouter.route('/')
    .get(getAllTours)
    .post(checkBody, createPack)
tourRouter.route('/:id') 
    .get(getSinglePack)
    .patch(updatePack)
    .delete(deletePack)

module.exports = tourRouter;