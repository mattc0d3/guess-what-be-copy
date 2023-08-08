const { selectUsers, selectAllUsers, insertUser } = require('../models/users.models')

exports.getUsers = async (req, res, next) => {
    const { sort_by, page, period } = req.query
    try {
        const users = await selectUsers(sort_by, page, period)
        const totalResults = await selectAllUsers()
        res.status(200).send({ users, totalResults })
    } catch (error) {
        return next(error)
    }
}

exports.postUsers = async (req, res, next) => {
    const { username, score, minutes, seconds } = req.body
    try {
        const user = await insertUser(username, score, minutes, seconds)
        res.status(201).send({ user })
    } catch (error) {
        return next(error)
    }
}