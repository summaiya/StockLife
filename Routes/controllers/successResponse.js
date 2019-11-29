const importFilesFunc = require("../importFileData/importFileData");
const fs = require('fs');
const successDataRes = async(collectionData, token)=>{
    //importFilesFunc()
    return {
        status: 'Successful',
        token: token ? token : undefined,
        length:  collectionData === null ? "Item Not Found": collectionData.length,
        data: collectionData === null ? "Item Not Found": collectionData,
    }
}
module.exports = successDataRes;