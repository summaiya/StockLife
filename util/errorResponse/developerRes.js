module.exports = (err)=>{
    return {
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    }
}