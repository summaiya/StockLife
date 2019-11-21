class APIFeatures {
    constructor(queryData, dataModel){
        this.queryData = queryData
        this.dataModel = dataModel
    }
    filter(){
        /**
         * 1)Filtering
         * Input: anything contains what is inside the => arrayFiltering
         * output: Do not display what's inside the => arrayFiltering
         */
        let queryObjFiltering = {...this.queryData}; //Get the query objects
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
        //===============================================================
        // this.finalQuery = this.dataModel.find(queryObjFiltering) 
        return queryObjFiltering
    }
     sortFieldPagination(){
        let finalQuery = this.dataModel.find(this.filter());
        Object.entries(this.queryData).forEach(entry => {
            /**
             * 3)Sorting
             * Input: sort=-price,ratingsQuantity
             * Output: Descending Price info and accesending ratingsQuantity
             */ 
            if(entry[0] === "sort"){ 
                let querySort = this.queryData.sort.replace(",", " ");
                finalQuery = finalQuery.sort(querySort)
            }
            /**
             * 4)Field
             * Input: fields=name,price,duration
             * output: selected infomation
             */
            else if(entry[0] === "fields"){
                let queryField = this.queryData.fields.split(",").join(" ")
                finalQuery = finalQuery.select(queryField);
            }
            /**
             * 5)Pagination
             * Input: page=1&limit=3
             * Output: at page 1, there are 3 dataset
             */
            else if(entry[0] === "page" && this.queryData.limit){
                const page = JSON.parse(this.queryData.page);
                const limit = JSON.parse(this.queryData.limit);
                const skip = (page - 1) * limit;
               finalQuery = finalQuery.skip(skip).limit(limit)
            }
            else if(entry[0] === "limit"){
                const limit = JSON.parse(this.queryData.limit);
                finalQuery = finalQuery.limit(limit)
            }
            //Normal Display
            // else{
            //     finalQuery = finalQuery.find(queryObjFiltering);
            // }
              });
            return finalQuery
            
    }
}

module.exports = APIFeatures