const express = require('express');
const fs = require('fs');
const tourRouter = express.Router();
const tourDataModel = require("../Model/tourModeling");
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

//Response with Success Data
const successDataRes = async(collectionData)=>{
    // let collectionData = await tourCollection();
    if(collectionData.length === 0){
        const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
        try{
            collectionData = await tourDataModel.create(tourContent);
        }catch(err){
            console.log(err)
        }
    }
    return {
        status: 'success',
        length: collectionData.length,
        data: collectionData
    }
}
const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}


//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------

const getAllPacks = async (req, res)=>{
    try{
        
    //1)Filtering
        let queryObjFiltering = {...req.query}; //Get the query objects
        console.log("filter", queryObjFiltering) //Print what is inside the query objects
        const arrayFiltering = ["sort", "windows"] //array of words to filter out
        arrayFiltering.forEach(element=>{
            delete queryObjFiltering[element] //filter the query objects
        })
    //2)Advanced Filtering (gte, gt, lte, lt)
        let queryObjFilteringString = JSON.stringify(queryObjFiltering); //turn Query Object into a string
        queryObjFilteringString= queryObjFilteringString.replace(/\b(gte|gt|lt|lte)\b/g, (match)=>`$${match}`); //add "$" in front of the comparison
        queryObjFiltering = JSON.parse(queryObjFilteringString); //String => parse

    //3)Sorting
        console.log("sorting", queryObjFiltering) //Print what is inside the query objects
        let queryData = null
        if(req.query.sort){ 
            let querySort = req.query.sort.replace(",", " ");
            queryData = await tourDataModel.find(queryObjFiltering).sort(querySort)
            }   
        else{
            queryData = await tourDataModel.find(queryObjFiltering);
        }
    //4)Field
        if(req.query.fields){
            let queryField = req.query.fields.replace(",", " ");
            // console.log("queryField", queryField)
            queryData = await tourDataModel.find(queryObjFiltering).select("name price");
        }
        //Main) Response Sent
        res.status(200).json(await successDataRes(queryData));
    }catch(error){
        console.log("error", error)
    }
}
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
    .get(getAllPacks)
    .post(checkBody, createPack)
tourRouter.route('/:id') 
    .get(getSinglePack)
    .patch(updatePack)
    .delete(deletePack)

module.exports = tourRouter;