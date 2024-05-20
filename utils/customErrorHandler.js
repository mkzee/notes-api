class CustomErrorsApi extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error' 

        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}


const CustomErrors = (message, statusCode) => {
    return new CustomErrorsApi(message, statusCode)
}

module.exports = CustomErrors
