const Promises = require('../../utils/promises')
const mongoose = require('mongoose');
const Appointments = mongoose.model('Appointments');
const CreateAppointmentReqSchema = require('./reqSchemas/createAppointmentReqSchema')

exports.create  = (req, res) => {
    Promises.hasValidBodyAndSchema(req, res, CreateAppointmentReqSchema)
        .then(() => {
            let newAppointment = new Appointments(req.body);
            newAppointment.save()
                .then((appointment) => {
                    return Promises.handleSuccess(req, res, appointment);
                })
                .catch((e) => {
                    return Promises.handleError(req, res, e);
                })
        })
        .catch((e) => {
            return Promises.handleError(req, res, e);
        });
}