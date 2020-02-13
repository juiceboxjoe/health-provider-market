/*
Sample:
{
  providerId: "123id45"
}
*/

module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "providerId": {
            "type": "string"
        }
    },
    "required": [
        "providerId"
    ]
}