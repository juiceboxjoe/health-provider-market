const Promises = require('../../utils/promises')
// const utils = require('../../utils/misc')
// const mongoose = require('mongoose');
// const Providers = mongoose.model('Providers');
// const Patients = mongoose.model('Patients');

// const UserLoginReqSchema = require('./reqSchemas/userLoginReqSchema')

let session = {
    user: '',
    userType: '',

}

exports.login  = (req, res) => {
    // TODO validate request params, fetch user from DB, and determine user type for session meta
    session = {
        user: {
            "_id" : "5e3f855daef9090896b414e9",
            "name" : "Fulano de tal",
            "insurance" : "Blue Cross",
            "gender" : "male",
            "dateOfBirth" : "2020-02-09T04:06:52.948Z",
            "phone" : "123-123-1234",
            "creationDate" : "2020-02-09T04:06:52.948Z",

        },
        userType: 'patient',

    }
    return Promises.handleSuccess(req, res, session);
}

exports.getSession  = (req, res) => {
    return Promises.handleSuccess(req, res, session);
}

exports.logout = (req, res) => {
    session = {
        user: '',
        userType: '',

    }
    return Promises.handleSuccess(req, res, session);
}