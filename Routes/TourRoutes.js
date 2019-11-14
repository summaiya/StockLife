const express = require('express');
const colors = require('colors')
const fs = require('fs');
const tourRouter = express.Router();
//Get json file
const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//ROUTE HANDLE ASSISTANCE----------------------------------------------------------------------------------------------------------------
const findItem = (items, itemFind)=>{
    if(isNaN(itemFind) !== true){
        return items.find(element=>element.id===JSON.parse(itemFind))
    }
    else{
        return undefined
    }
}
const successDataRes = {
    status: 'success',
    length: tourContent.length,
    data: tourContent
}
const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}
const writeFileFunc = (HTTPMethods)=>{
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourContent), (err)=>{
        console.log(`${HTTPMethods} is not successful. Error : ${err}`)
    })
}

//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------
const getAllPacks = (req, res)=>{
    res.status(200).json(successDataRes);
}
const createPack = (req, res)=>{
    const incomingID =  tourContent[tourContent.length-1].id + 1;
    const newPack = Object.assign({id: incomingID}, req.body);
    tourContent.push(newPack);
    writeFileFunc('Create');
    res.status(201).json(successDataRes);    //SEND JSON version
}
const getSinglePack = (req, res)=>{
    const ans = findItem(tourContent, (req.params.id));
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
    const currentPack = findItem(tourContent, req.params.id);
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
    const deletePack = findItem(tourContent,(req.params.id));
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
    .post(createPack)
tourRouter.route('/:id') 
    .get(getSinglePack)
    .patch(updatePack)
    .delete(deletePack)

module.exports = tourRouter;