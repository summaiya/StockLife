const express = require('express');
const fs = require('fs');
const tourRouter = express.Router();
const tourDataModel = require("../Model/tourModeling");
// Get json file
// const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
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
    const collection = await tourDataModel.find();
    return collection;
}
//Get DATA=======
const successDataRes = async()=>{
    const collectionData = await tourCollection();
    console.log('collection', collection);
    return {
    status: 'success',
    length: collectionData.length,
    data: collectionData
    }
}
const findItem = async(itemFind)=>{
    console.log('itemFind', itemFind);
    if(itemFind){
        const collection = await tourCollection();
        console.log('collection', collection);
        return collection.find(element=>element["_id"]===itemFind)
    }
    else{
        return undefined
    }
}


const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}
const writeFileFunc = (HTTPMethods)=>{
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourContent), (err)=>{
       if(err){
        console.log(`${HTTPMethods} is not successful. Error : ${err}`)
       }
    })
}

//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------

const getAllPacks = async (req, res)=>{
    res.status(200).json(await successDataRes());
}
const createPack = (req, res)=>{
    // const incomingID =  tourContent[tourContent.length-1].id + 1;
    // const newPack = Object.assign({id: incomingID}, req.body);
    // tourContent.push(newPack);
    // writeFileFunc('Create');
    tourDataModel.create(req.body).then(async(data)=>{
        res.status(201).json(await successDataRes());
    }).catch(err=>{
        console.log(err);
        res.status(401).json(notFoundRes)
    })
}
const getSinglePack = async (req, res)=>{
    const ans = await findItem(req.params.id);
    console.log("ans", ans)
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
const updatePack = (req, res)=>{
    const currentPack = findItem(req.params.id);
    if(currentPack !== undefined){
        const inputData = req.body; //NEW Incoming Data
        const newCurrentPack = Object.assign(currentPack, inputData); // Update the Current Pack
        tourContent[tourContent.indexOf(currentPack)] = newCurrentPack; //Insert the Updated Current Pack to the tourContent
        writeFileFunc('PATCH'); 
        res.status(200).json(successDataRes)
    }
    else{
        res.status(404).json(notFoundRes)
    }
}
const deletePack = (req, res)=>{
    const deletePack = findItem(req.params.id);
   if(deletePack !== undefined){
        tourContent.splice(tourContent.indexOf(deletePack), 1);
        writeFileFunc('DELETE')
        res.status(200).json(successDataRes)
   }
   else{
    res.status(404).json(notFoundRes)
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