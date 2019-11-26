module.exports = (err)=>{
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
   