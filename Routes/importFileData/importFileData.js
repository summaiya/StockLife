const fs = require("fs");

module.exports = (fileDirectory)=>{
    const importData = JSON.parse(fs.readFileSync(fileDirectory));
    try{
        console.log(importData);
    }catch(err){
        console.log(err)
    }
}