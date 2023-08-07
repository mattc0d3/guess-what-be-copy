exports.handleMongoErrors = (err, req, res, next) => {
    console.log("IN MONGO ERROR HANDLER")
    if (err.code) {
        return res.status(400).send({ msg: "Bad Request"})
    } else next(err)
}

exports.handleCustomErrors = (err, req, res, next) => {
    console.log("IN CUSTOM ERROR HANDLER")
    if (err.msg) {
        return res.status(err.status).send({ msg: err.msg })
    } else next(err)
}

exports.handleInternalErrors = (err, req, res, next) => {
    console.log("IN INTERNAL ERROR HANDLER")
    return res.status(500).send({ msg: "Internal Error"})
}