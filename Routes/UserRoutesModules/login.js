const ErrorClass = require("../../util/ErrorClass");
const login = (req, res, next)=>{
    const {email, password} = req.body;
    //1) Check if the email and password exists
    if(!email || !password){
        next(new ErrorClass("We need both email and password, please try again!", 400))
    }  
}

module.exports = login