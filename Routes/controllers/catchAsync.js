const ErrorClass = require("../../util/ErrorClass");
const catchAsync = (fn, statusCode) =>{
    return (req, res, next)=>{
        fn(req,res,next).catch(err=>{
            console.log("err.message", err)
            next(new ErrorClass(err, statusCode))
        })
    }
}
module.exports = catchAsync