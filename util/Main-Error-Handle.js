const ErrorClass = require("../util/ErrorClass");
const developerResponse = require("./errorResponse/developerRes");
const productionResponse = require("./errorResponse/productionRes");

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
        /**
         * Wrong Web Token
         */
            else if (clearError.error.name === "JsonWebTokenError"){
                clearError.error.message = "Wrong Web Token"
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
        /**
         * Expire Web Token
         */
            else if (clearError.error.name === "TokenExpiredError"){
                clearError.error.message = "Web Token Expired";
                clearError = new ErrorClass(clearError.error, clearError.statusCode)
            }
        res.status(err.statusCode).json(productionResponse(clearError))
    }
}