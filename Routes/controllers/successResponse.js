const tourDataModel = require("../../Model/tourModeling");
const fs = require('fs');
const successDataRes = async(collectionData, token)=>{
    if(collectionData !== null){
        /**
         * Insert Default Data
         */
        if(collectionData.length === 0){
            const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
            try{
                collectionData = await tourDataModel.create(tourContent);
            }catch(err){
                console.log(err)
            }
        }
    }
    return {
        status: 'Successful',
        token: token ? token : undefined,
        length:  collectionData === null ? "Item Not Found": collectionData.length,
        data: collectionData === null ? "Item Not Found": collectionData,
    }
}
module.exports = successDataRes;