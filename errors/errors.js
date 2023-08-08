exports.handleMongoErrors = (err, req, res, next) => {
    if (err.code) {
        return res.status(400).send({ msg: "Bad Request"})
    } else next(err)
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.msg) {
        return res.status(err.status).send({ msg: err.msg })
    } else next(err)
}

exports.handleInternalErrors = (err, req, res, next) => {
    return res.status(500).send({ msg: "Internal Error"})
}