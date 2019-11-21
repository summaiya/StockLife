//Import===================================================
const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
//Import===================================================


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
        let queryData = tourDataModel.find(queryObjFiltering)
        console.log('req.query', req.query)
    /**
     * 3)Sorting
     * Input: sort=-price,ratingAverage
     * Output: Descending Price info and accesending ratingAverage
     */ 
        if(req.query.sort){ 
            let querySort = req.query.sort.replace(",", " ");
            queryData = queryData.sort(querySort)
        }
    /**
     * 4)Field
     * Input: fields=name,price,duration
     * output: selected infomation
     */
        else if(req.query.fields){
            let queryField = req.query.fields.split(",").join(" ")
            console.log('queryField', queryField)
            queryData = queryData.select(queryField);
        }
    /**
     * 5)Pagination
     * Input: page=1&limit=3
     * Output: at page 1, there are 3 dataset
     */
         else if(req.query.page && req.query.limit){
            const queryDataLength = await tourDataModel.find(queryObjFiltering);
            const page = JSON.parse(req.query.page);
            const limit = JSON.parse(req.query.limit);
            const skip = (page - 1) * limit;
            if(page > (queryDataLength.length / limit)) { 
                throw new Error ("Beyond numbers of Pages")
            }
            queryData = queryData.skip(skip).limit(limit)
         }
    //Normal Display
        else{
            queryData = queryData.find(queryObjFiltering);
        }
    //Main) Response Sent
        res.status(200).json(await successDataRes(await queryData));
    }catch(error){
        console.log("error", error)
    }
}

module.exports = getAllPacks;