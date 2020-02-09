/*
Sample:
{
    providerId: "5e3e1affb3092005bf56507a",
    patientId: "5e3e1affb3092005bf56507a",
    startTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
    endTime: "Fri Feb 07 2020 23:25:03 GMT-0400 (Atlantic Standard Time)",
    appointmentReason: "It hurts",
}
*/

module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "providerId": {
            "type": "string"
        },
        "patientId": {
            "type": "string"
        },
        "startTime": {
            "type": "string"
        },
        "endTime": {
            "type": "string"
        },
        "appointmentReason": {
            "type": "string"
        }
    },
    "required": [
        "providerId",
        "patientId",
        "startTime",
        "endTime",
        "appointmentReason"
    ]
}