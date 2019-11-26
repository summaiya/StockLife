
//Import===================================================
const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("../controllers/successResponse");
const apiFeatures = require("../../util/apiFeatures");
const catchAsync = require("../controllers/catchAsync");
//Import===================================================
const getAllPacks = catchAsync(async (req, res)=>{
    const tourAPIFeatures = new apiFeatures(req.query, tourDataModel).sortFieldPagination();
//=============================================  
    //Main) Response Sent
    res.status(200).json(await successDataRes(await tourAPIFeatures));
})
module.exports = getAllPacks;
