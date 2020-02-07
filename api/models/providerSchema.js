'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    providerId: {
        type: Number,
        index: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type_of_doctor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location_marker: {
        type: Number,
        required: true
    },
    overall_rating: {
        type: Number,
        required: true
    },
    calendar_id: {
        type: String,
        required: true
    },
    npi_number: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Provider', ProviderSchema);