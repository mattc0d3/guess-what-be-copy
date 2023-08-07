const User = require('../db/seeds/schemata/User')

exports.selectUsers = async (sort_by = "score") => {
    let sort = { sort_by: 1}
    if (sort_by === "time") {
        sort = { "time.minutes": 1, "time.seconds": 1 }
    }

    try {
        const users = await User.find().sort(sort)
        return users
    } catch (err) {
        res.status(500).send({ msg: "Internal Error" })
    }
}

exports.insertUser = async (username, score, minutes, seconds) => {
    try {
        console.log(username, score, minutes, seconds, "<<<<< model params")
        const newUser = new User({
            username: username,
            score: score,
            time: {
                seconds: seconds,
                minutes: minutes
            }
        })
        await newUser.save()
        return newUser
    } catch (err) {
        console.log("caught error in 400 insertUser model")
        res.status(400).send({ msg: "Bad Request"})
    }
}