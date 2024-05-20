const customErrors = require('../utils/customErrorHandler')

const devError = (res, error) => {
    const statusCode = error.statusCode || 500
    const message = error.message || 'something went wrong'
    
    res.status(statusCode).json({
        statuscode: statusCode,
        message: message,
        stacktrace: error.stack,
        error: error
    }); 
}


const prodError = (res, error) => {
    const message = error.message || 'something went wrong'
    const statusCode = error.statusCode || 500
    if (error.isOperational) {
        res.status(statusCode).json({
            statuscode: statusCode,
            message: message,
        }); 
    } else {
        res.status(statusCode).json({
            message: 'Something went wrong. Please try again later'
        })
    }
}


const castErrorHandler = (error) => {
    let msg = `invalid value for ${error.path}: ${error.valur}`
    return customErrors(msg, 400)
}

const validationErrorHandler = (error) => {
    const errorArr = Object.values(error.errors)
    const msgArr = [];
    errorArr.forEach(element => msgArr.push(element.message))
    const msg = msgArr.join(', ')

    return customErrors(msg, 400)
}

const errorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
        devError(res, error)
    } else {
        if (error.name === 'CastError') error = castErrorHandler(error)
        if (error.name === 'ValidationError') error = validationErrorHandler(error)

        prodError(res, error)
    }
}

module.exports = errorHandler;