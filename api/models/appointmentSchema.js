'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    providerId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    appointmentReason: {
        type: String,
        required: true
    },
    cancelled: Boolean,
    cancellationProb: Number,
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointments', AppointmentSchema);