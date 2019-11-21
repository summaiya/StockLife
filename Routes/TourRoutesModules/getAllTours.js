//Import===================================================
const tourDataModel = require("../../Model/tourModeling");
const successDataRes = require("./successResponse");
//Import===================================================
// class APIFeatures {
//     constructor(query){
//         this.query = query
//     }
//     filter(){

//     }
// }

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
        const queryDataLength = await tourDataModel.find(queryObjFiltering);

        Object.entries(req.query).forEach(entry => {
        console.log('entry', entry)
        /**
         * 3)Sorting
         * Input: sort=-price,ratingsQuantity
         * Output: Descending Price info and accesending ratingsQuantity
         */ 
        if(entry[0] === "sort"){ 
            let querySort = req.query.sort.replace(",", " ");
            queryData = queryData.sort(querySort)
        }
        /**
         * 4)Field
         * Input: fields=name,price,duration
         * output: selected infomation
         */
        else if(entry[0] === "fields"){
            let queryField = req.query.fields.split(",").join(" ")
            console.log('queryField', queryField)
            queryData = queryData.select(queryField);
        }
        /**
         * 5)Pagination
         * Input: page=1&limit=3
         * Output: at page 1, there are 3 dataset
         */
        else if(entry[0] === "page" && req.query.limit){
            const page = JSON.parse(req.query.page);
            const limit = JSON.parse(req.query.limit);
            const skip = (page - 1) * limit;
            if(page > (queryDataLength.length / limit)) { 
                throw new Error ("Beyond numbers of Pages")
            }
            queryData = queryData.skip(skip).limit(limit)
        }
        else if(entry[0] === "limit"){
            const limit = JSON.parse(req.query.limit);
            queryData = queryData.limit(limit)
        }
        //Normal Display
        else{
            queryData = queryData.find(queryObjFiltering);
        }
          }); 
    //Main) Response Sent
        res.status(200).json(await successDataRes(await queryData));
    }catch(error){
        console.log("error", error)
    }
}

module.exports = getAllPacks;