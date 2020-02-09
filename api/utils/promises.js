const Promise = require('bluebird');
const utils = require('./misc')

module.exports.statusCodes = {
    STATUS_200: 200,
    STATUS_400: 400,
    STATUS_404: 404,
    STATUS_500: 500
}

const MALFORMED_BODY_MSG = 'malformed request body';
const MALFORMED_QUERY_MSG = 'malformed request query';
const SCHEMA_ERROR_MSG = 'json schema may be incorrect';

module.exports.hasValidQueryAndSchema = (req, res, schema) => {
    return new Promise((resolve, reject) => {
        if (!req.query || typeof req.query !== 'object' || Object.keys(req.query).length === 0) {
            reject(utils.makeError(MALFORMED_QUERY_MSG, module.exports.statusCodes.STATUS_400));
            return;
        }

        if(!utils.hasValidSchema(req.query, schema)){
            reject(utils.makeError(SCHEMA_ERROR_MSG, module.exports.statusCodes.STATUS_400, schema));
        }
        else{
            resolve()
        }
    });
}

module.exports.hasValidBodyAndSchema = (req, res, schema) => {
    return new Promise((resolve, reject) => {
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            reject(utils.makeError(MALFORMED_BODY_MSG, module.exports.statusCodes.STATUS_400));
            return;
        }

        if(!utils.hasValidSchema(req.body, schema)){
            reject(utils.makeError(SCHEMA_ERROR_MSG, module.exports.statusCodes.STATUS_400, schema));
        }
        else{
            resolve()
        }
    });
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
        res.status(e.__statusCode || module.exports.statusCodes.STATUS_500)
            .json({
                error: e.message || 'failed to process request',
                meta: e.__meta
            })
            .end();
        resolve();
    })
}