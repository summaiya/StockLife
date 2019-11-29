const fs = require("fs");

module.exports = async (fileDirectoryName, dataModel)=>{
    const importData = JSON.parse(fs.readFileSync(fileDirectoryName));
    try{
        await dataModel.create(importData);
    }catch(err){
        console.log(err)
    }
}