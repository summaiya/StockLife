class ErrorHandling extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.operational = true;
        this.status = `${statusCode}`.startsWith(4) ? "Client Error" : "Server Error"
    }
}

module.exports = ErrorHandling;