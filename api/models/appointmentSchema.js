'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    id: {
        type: Number,
        index: true,
        required: true
    },
    providerId: {
        type: Number,
        index: true,
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
    patient: {
        name: {
            type: String,
            required: true
        },
        insurance: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    creationDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);