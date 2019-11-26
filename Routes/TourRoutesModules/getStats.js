const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
const getBestMonth = async (req, res)=>{
    try{
        const year = 2021;
        const bestMonth = await tourDataModel.aggregate([
            {
                $unwind: "$startDates"
            },
            {
                $match:{
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id: {
                        $month: "$startDates"
                    },
                    count:{
                        $sum: 1
                    },
                    tours:{
                        $push: '$name'
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        res.status(200).json(await successDataRes(bestMonth))
    }catch(error){
        console.log(error)
    }
}

module.exports = getBestMonth;