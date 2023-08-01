const endpoints = require('../endpoints.json')

exports.getEndpoints = (_, res) => {
    res.status(200).send({ endpoints })
}