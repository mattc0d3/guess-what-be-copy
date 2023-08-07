const { selectUsers, insertUser } = require('../models/users.models')

exports.getUsers = async (req, res, next) => {
    const { sort_by, page, period } = req.query
    try {
        const users = await selectUsers(sort_by, page, period)
        res.status(200).send({ users })
    } catch (error) {
        return next(error)
        return res.status(500).send({ msg: "Internal Error" });
    }
}

exports.postUsers = async (req, res, next) => {
    const { username, score, minutes, seconds } = req.body
    console.log(username, score, minutes, seconds, "<<<<< controller params")
    try {
        const user = await insertUser(username, score, minutes, seconds)
        console.log("in try block user = ", user)
        res.status(201).send({ user })
    } catch (error) {
        return next(error)
        console.log("in controller catch block")
        return res.status(400).send({ msg: "Bad Request"})
        // res.status(500).send({ msg: "Internal Error" });
    }
}