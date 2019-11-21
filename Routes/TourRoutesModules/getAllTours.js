//Import===================================================
const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
const apiFeatures = require("../../util/apiFeatures");
//Import===================================================

const getAllPacks = async (req, res)=>{
    try{
    const tourAPIFeatures = new apiFeatures(req.query, tourDataModel).sortFieldPagination();
//=============================================  
    //Main) Response Sent
    res.status(200).json(await successDataRes(await tourAPIFeatures));
    }catch(error){
        console.log("error", error)
    }
}

module.exports = getAllPacks;
