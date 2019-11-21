const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
const getStats = async (req, res)=>{
    try{
        const stats = await tourDataModel.aggregate([
            { 
                $match: {} 
            },
            { 
                $group: { 
                    _id: "difficulty", 
                    total: { $sum: "$price" },
                    average: {$avg: "$price"}
                } 
            }
         ])
        res.status(200).json(await successDataRes(stats))
    }
    catch(error){
        console.log(error)
    }
}
module.exports = getStats;