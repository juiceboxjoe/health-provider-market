const Validator = require('jsonschema').Validator;

module.exports.isValidMongoSortOrder = (sortOrder) => {
    return sortOrder != "asc" || sortOrder != "desc"
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

module.exports.makeError = (errorMessage, status, meta) => {
    const e = new Error(errorMessage);
    e.__statusCode = status;
    e.__meta = meta;
    return e;
}