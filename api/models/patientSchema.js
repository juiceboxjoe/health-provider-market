'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
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
        required: true,
        enum: ["male", "female"]
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patients', PatientSchema);