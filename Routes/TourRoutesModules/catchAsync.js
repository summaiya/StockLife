const ErrorClass = require("../../util/ErrorClass");
const catchAsync = fn =>{
    return (req, res, next)=>{
        fn(req,res,next).catch(err=>{
            console.log(err)
            next(new ErrorClass(err, 404))
        })
    }
}

module.exports = catchAsync