const mongoose = require('mongoose');
require('./providerSchema');
require('./patientSchema');
require('./appointmentSchema');

const Providers = mongoose.model('Providers');
const Patients = mongoose.model('Patients');
const Appointments = mongoose.model('Appointments');

mongoose.Promise = global.Promise;

let providers = [
    {
        address: {
            street: 'Street number',
            city: 'My City',
            state: 'FL',
            zip: 12345
        },
        type_of_doctor: 'Dentist',
        name: 'Tito',
        gender: 'male',
        phone: '123-123-1234',
        location_marker: 12345,
        overall_rating: 1,
        calendar_id: 'calendarid',
        npi_number: 'mynpi#',
        creationDate: new Date()
    },
    {
        address: {
            street: 'Street number',
            city: 'My City',
            state: 'FL',
            zip: 12345
        },
        type_of_doctor: 'Pediatrician',
        name: 'Tito',
        gender: 'male',
        phone: '123-123-1234',
        location_marker: 12345,
        overall_rating: 1,
        calendar_id: 'calendarid',
        npi_number: 'mynpi#',
        creationDate: new Date()
    },
    {
        address: {
            street: 'Street number',
            city: 'My City',
            state: 'FL',
            zip: 12345
        },
        type_of_doctor: 'Cardiologist',
        name: 'Tito',
        gender: 'male',
        phone: '123-123-1234',
        location_marker: 12345,
        overall_rating: 1,
        calendar_id: 'calendarid',
        npi_number: 'mynpi#',
        creationDate: new Date()
    }
]

let patients = [
    {
        name: 'Fulano de tal',
        insurance: 'Blue Cross',
        gender: 'male',
        dateOfBirth: new Date(),
        phone: '123-123-1234',
        creationDate: new Date()
    },
    {
        name: 'Fulano de tal',
        insurance: 'Blue Cross',
        gender: 'male',
        dateOfBirth: new Date(),
        phone: '123-123-1234',
        creationDate: new Date()
    },
    {
        name: 'Fulano de tal',
        insurance: 'Blue Cross',
        gender: 'male',
        dateOfBirth: new Date(),
        phone: '123-123-1234',
        creationDate: new Date()
    }
]
let appointments = [
    {
        providerId: undefined,
        patientId: undefined,
        startTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        endTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        appointmentReason: "It hurts",
    },
    {
        providerId: undefined,
        patientId: undefined,
        startTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        endTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        appointmentReason: "It hurts",
    },
    {
        providerId: undefined,
        patientId: undefined,
        startTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        endTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
        appointmentReason: "It hurts",
    }
]

//TODO wrap connection code with catch and handle error
mongoose.connect('mongodb://localhost/HEALTH_PROVIDER_MARKET_DB', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (e, db) => {
    db.dropDatabase()

    Providers.insertMany(providers).then((insertedProviders) => {
        Patients.insertMany(patients).then((insertedPatients) => {
            appointments[0].providerId = insertedProviders[0]._id
            appointments[1].providerId = insertedProviders[1]._id
            appointments[2].providerId = insertedProviders[2]._id

            appointments[0].patientId = insertedPatients[0]._id
            appointments[1].patientId = insertedPatients[1]._id
            appointments[2].patientId = insertedPatients[2]._id

            Appointments.insertMany(appointments).then((r) => {
                console.log('Done seeding DB')
                db.close()
            }).catch((e) => {
                console.log(e)
                db.close()
            })
        }).catch((e) => {
            console.log(e)
            db.close()
        })
    }).catch((e) => {
        console.log(e)
        db.close()
    })
});
