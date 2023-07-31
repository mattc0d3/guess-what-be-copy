exports.handleMongoDbErrors = (err, req, res, next) => {
    console.log(err, "<<<<<<<<<< error in MongoDB error handler")
    if (err.code) {
        res.status(400).send({ msg: "Bad Request"})
    } else next(err)
}

exports.handleCustomErrors = (err, req, res, next) => {
    console.log(err, "<<<<<<<<<< error in custom error handler")
    if (err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else next(err)
}

exports.handleInternalErrors = (err, req, res, next) => {
    console.log(err, "<<<<<<<<<< error in internal error handler")
    res.status(500).send({ msg: "Internal Error"})
}