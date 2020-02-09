'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

const ProviderSchema = new Schema({
    address: {
        street: String,
        city: String,
        state: {
            type: String,
            uppercase: true,
            required: true,
            enum: statesArray
        },
        zip: Number
    },
    type_of_doctor: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
        index: true
    },
    phone: {
        type: String,
        required: true,
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
        required: true,
        unique: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Providers', ProviderSchema);