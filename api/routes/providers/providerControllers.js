const Promises = require('../../utils/promises')
const mongoose = require('mongoose');
const Providers = mongoose.model('Providers');
const ListProvidersReqSchema = require('./reqSchemas/listProvidersReqSchema')

const pageLimit = 10

exports.list  = (req, res) => {
    req.query.page = parseInt(req.query.page)
    Promises.hasValidQueryAndSchema(req, res, ListProvidersReqSchema)
        .then(() => {
            Providers.find({})
                .then((providers) => {
                    return Promises.handleSuccess(req, res, providers);
                })
                .catch((e) => {
                    return Promises.handleError(req, res, e);
                })
        })
        .catch((e) => {
            return Promises.handleError(req, res, e);
        });
}

// exports.list = (req, res) => {
//     appointments.find({}, function(e, blobs) {
//         if (e)
//             return Promises.handleError(req, res, e);
//         return Promises.handleSuccess(req, res, blobs);
//     });
// };