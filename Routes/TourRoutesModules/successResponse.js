const tourDataModel = require("../../Model/tourModeling");
const fs = require('fs');
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
module.exports = successDataRes;