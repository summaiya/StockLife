const ErrorClass = require("../util/ErrorClass");
const developerResponse = (err)=>{
    return {
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    }
}
const productionResponse = (err)=>{
    //console.log('err', err)
    if(err.operational === true){
        return {
            status: err.status,
            message: err.message || err.error
        }
    }
    else{
        //1) log the error first
        console.error("Error!!!!!", error)
        //2) Send the Error
        return{
            status: "Error",
            message: "Sorry! Something is wrong."
        }
    }
}
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
        console.log('clearError', clearError)
            if(clearError.error.name === "CastError"){
                let message = `Error ${clearError.error.path}: ${clearError.error.value}`;
                clearError.error.message = message;
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
            else if (clearError.error.code === 11000){
                //clearError.error.errmsg
                let message = "Error===> duplicate error";
                clearError.error.message = message;
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
        res.status(err.statusCode).json(productionResponse(clearError))
    }
}