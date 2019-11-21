const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
const getAllPacks = async (req, res)=>{
    try{
    /**
     * 1)Filtering
     * Input: anything contains what is inside the => arrayFiltering
     * output: Do not display what's inside the => arrayFiltering
     */
        let queryObjFiltering = {...req.query}; //Get the query objects
        const arrayFiltering = ["sort", "fields", "page", "limit"] //array of words to filter out
        arrayFiltering.forEach(element=>{
            delete queryObjFiltering[element] //filter the query objects
        })
    /**
     * 2) Advanced Filtering
     * Input: price[gte]=500 || price[gt] =500 || price[lte] = 500 || price[lt] = 500
     * Output: display select packs
     */
        let queryObjFilteringString = JSON.stringify(queryObjFiltering); //turn Query Object into a string
        queryObjFilteringString= queryObjFilteringString.replace(/\b(gte|gt|lt|lte)\b/g, (match)=>`$${match}`); //add "$" in front of the comparison
        queryObjFiltering = JSON.parse(queryObjFilteringString); //String => parse
//=============================================  
        let queryData = null
    /**
     * 3)Sorting
     * Input: sort=-price,ratingAverage
     * Output: Descending Price info and accesending ratingAverage
     */ 
        if(req.query.sort){ 
            let querySort = req.query.sort.replace(",", " ");
            queryData = await tourDataModel.find(queryObjFiltering).sort(querySort)
        }
    /**
     * 4)Field
     * Input: fields=name,price,duration
     * output: selected infomation
     */
        else if(req.query.fields){
            let queryField = req.query.fields.replace(",", " ");
            queryData = await tourDataModel.find().select(queryField);
        }
    /**
     * 5)Pagination
     * Input: skip=10,limit=10
     */
         else if(req.query.page){
             console.log(`page ${req.query.page}, limit${req.query.limit}`)
            const page = JSON.parse(req.query.page);
            const limit = JSON.parse(req.query.limit);
            const skip = (page - 1) * limit;
            queryData = await tourDataModel.find().skip(skip).limit(limit)
         }
    //Normal Display
        else{
            queryData = await tourDataModel.find(queryObjFiltering);
        }
    
    //Main) Response Sent
        res.status(200).json(await successDataRes(queryData));
    }catch(error){
        console.log("error", error)
    }
}

module.exports = getAllPacks;