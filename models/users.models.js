const User = require('../db/seeds/schemata/User')

exports.selectUsers = async (sort_by = "score", page = 1, period = "allTime") => {
    const validSortBy = ["score", "time", "created_at"]
    const validPeriod = ["week", "month", "year", "allTime"]

    if (!validSortBy.includes(sort_by) || !validPeriod.includes(period)) return Promise.reject({ status: 400, msg: "Bad Request"})

    let sort 
    if (sort_by === "score") sort = { "score": 1}
    else if (sort_by === "time") sort = { "time.minutes": 1, "time.seconds": 1 }
    else sort = { "created_at": -1 }


    let datesRange
    const currentDate = new Date()

    if (period === "allTime") datesRange = null
    else if (period === "year") datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getMonth() - 1)}}
    else if (period === "month") datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getMonth() - 1)}}
    else if (period === "week" )datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getDay() - 7)}}

    const skip = (page - 1) * 10

    try {
        const users = await User.find(datesRange).sort(sort).limit(10).skip(skip)
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