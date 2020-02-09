const Promise = require('bluebird');
const Validator = require('jsonschema').Validator;

module.exports.statusCodes = {
    STATUS_200: 200,
    STATUS_400: 400,
    STATUS_404: 404,
    STATUS_500: 500
}

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
        if (!req.query || typeof req.query !== 'object' || Object.keys(req.query).length === 0 || Object.keys(req.query).length != Object.keys(schema.properties).length) {
            reject(module.exports.makeError(MALFORMED_QUERY_MSG, module.exports.statusCodes.STATUS_400));
            return;
        }

        if(!module.exports.hasValidSchema(req.query, schema)){
            reject(module.exports.makeError(SCHEMA_ERROR_MSG, module.exports.statusCodes.STATUS_400, schema));
        }
        else{
            resolve()
        }
    });
}

module.exports.hasValidBodyAndSchema = (req, res, schema) => {
    return new Promise((resolve, reject) => {
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0 || Object.keys(req.body).length != Object.keys(schema.properties).length) {
            reject(module.exports.makeError(MALFORMED_BODY_MSG, module.exports.statusCodes.STATUS_400));
            return;
        }

        if(!module.exports.hasValidSchema(req.body, schema)){
            reject(module.exports.makeError(SCHEMA_ERROR_MSG, module.exports.statusCodes.STATUS_400, schema));
        }
        else{
            resolve()
        }
    });
}

module.exports.hasValidSchema = (data, schema) => {
    const v = new Validator({ throwError: false });
    const r = v.validate(data, schema);

    if(r.errors && r.errors.length > 0) {
        return false;
    } else {
        return true;
    }
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
                error: e.__statusMessage || e.message || 'failed to process request',
                meta: e.meta
            })
            .end();
        resolve();
    })
}

module.exports.makeError = (errorMessage, status, meta) => {
    const e = new Error(errorMessage, status);
    e.__statusCode = status;
    e.__statusMessage = errorMessage;
    e.meta = meta;
    return e;
}