const Promises = require('../../utils/promises')
const utils = require('../../utils/misc')
const mongoose = require('mongoose');
const Providers = mongoose.model('Providers');
const ListProvidersReqSchema = require('./reqSchemas/listProvidersReqSchema')
const ReadProvidersReqSchema = require('./reqSchemas/readProvidersReqSchema')

const pageSize = 2
const mongoSortDict = {
    "asc": 1,
    "desc" : -1
}

exports.list  = (req, res) => {
    if(typeof req.query.page == 'undefined')
        req.query.page = 0
    else
        req.query.page = parseInt(req.query.page)
    Promises.hasValidQueryAndSchema(req, res, ListProvidersReqSchema)
        .then(() => {
            if(!utils.isValidMongoSortOrder(req.query.sortOrder)){
                throw utils.makeError('Invalid sort order. Use "asc" or "desc".') // TODO add status code
            }

            let filters = {}
            if(typeof req.query.gender !== 'undefined')
                filters.gender = req.query.gender
            if(typeof req.query.availability !== 'undefined')
                filters.availability = req.query.availability
            if(typeof req.query.providerName !== 'undefined' && req.query.providerName != ""){
                // let s = '.*' + req.query.providerName + '*.'
                filters.name = new RegExp(req.query.providerName, 'i')
            }


            Providers.find(filters)
                .sort({createdDate: mongoSortDict[req.query.sortOrder]})
                // .skip(req.query.page * pageSize)
                // .limit(pageSize)
                .then((providers) => {
                    Providers.estimatedDocumentCount({})
                        .then((count) => {
                            return Promises.handleSuccess(req, res, {
                                providers: providers,
                                totalProviders: count
                            });
                        })
                        .catch((e) => {
                            return Promises.handleError(req, res, e);
                        })
                })
                .catch((e) => {
                    return Promises.handleError(req, res, e);
                })
        })
        .catch((e) => {
            return Promises.handleError(req, res, e);
        });
}

exports.read  = (req, res) => {
    Promises.hasValidQueryAndSchema(req, res, ReadProvidersReqSchema)
        .then(() => {
            Providers.findOne({_id: req.query.providerId})
                .then((provider) => {
                    return Promises.handleSuccess(req, res, {provider});
                })
                .catch((e) => {
                    return Promises.handleError(req, res, e);
                })
        })
        .catch((e) => {
            return Promises.handleError(req, res, e);
        });
}