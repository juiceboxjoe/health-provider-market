const Promise = require('bluebird');

module.exports.statusCodes = {
    STATUS_200: 200,
    STATUS_400: 400,
    STATUS_404: 404,
    STATUS_500: 500
}

module.exports.handleSuccess = (req, res, payload) => {
    return new Promise((resolve) => {
        res.status(module.exports.statusCodes.STATUS_200)
            .json(payload)
            .end();
        resolve();
    })
}

module.exports.handleError = (req, res, e) => {
    return new Promise((resolve) => {
        res.status(e.__statusCode || e.status || module.exports.statusCodes.STATUS_500)
            .json({
                error: e.__statusMessage || e.message || 'failed to process request'
            })
            .end();
        resolve();
    })
}

module.exports.makeError = (errorMessage, status) => {
    const e = new Error(errorMessage, status);
    e.__statusCode = status;
    e.__statusMessage = errorMessage;
    return e;
}