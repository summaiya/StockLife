const tourDataModel = require("../../Model/tourModeling");
const fs = require('fs');
const successDataRes = async(collectionData, token)=>{
    if(collectionData !== null){
        /**
         * Insert Default Data
         */
        if(collectionData.length === 0){
            console.log("I guess the database wasn't connect and the CRUD process didn't work man!".red)
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