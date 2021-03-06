/*
Sample:
{
  page: 2,
  gender: 'male',
  availability: 'time slot',
  typeOfDoctor: 'type of doctor'
}
*/

module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "page": {
            "type": "integer"
        },
        "sortOrder": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "availability": {
            "type": "string"
        },
        "typeOfDoctor": {
            "type": "string"
        },
        "providerName": {
            "type": "string"
        }
    },
}