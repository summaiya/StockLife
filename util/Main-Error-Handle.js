const ErrorClass = require("../util/ErrorClass");
const developerResponse = require("./errorResponse/developerRes");
const productionResponse = require("./errorResponse/productionRes");
// const developerResponse = (err)=>{
//     return {
//         status: err.status,
//         message: err.message,
//         stack: err.stack,
//         error: err
//     }
// }



// const productionResponse = (err)=>{
//     if(err.operational === true){
//         return {
//             status: err.status,
//             message: err.message || err.error
//         }
//     }
//     else{
//         //1) log the error first
//         console.error("Error!!!!!", error)
//         //2) Send the Error
//         return{
//             status: "Error",
//             message: "Sorry! Something is wrong."
//         }
//     }
// }
/**
 * Input: All kinds of error
 * output: send the response error data to the client
 */
module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV === "development"){
        res.status(err.statusCode).json(developerResponse(err))
    }
    else {
        let clearError = {...err};
        /**
         * Cast Error Message
         */
            if(clearError.error.name === "CastError"){
                let message = `Error ${clearError.error.path}: ${clearError.error.value}`;
                clearError.error.message = message;
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
        /**
         * Duplicated Error Message
         */
            else if (clearError.error.code === 11000){
                let message = "Error===> duplicate error";
                clearError.error.message = message;
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
        /**
         * Data Validation Error
         */
            else if(clearError.error.name === "ValidationError"){
                let message = [];
                for (let [key, value] of Object.entries(clearError.error.errors)) {
                    message.push(value.message);
                }
                clearError = new ErrorClass(message.join(". "), clearError.statusCode)
            }
        res.status(err.statusCode).json(productionResponse(clearError))
    }
}