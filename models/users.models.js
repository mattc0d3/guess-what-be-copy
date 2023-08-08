const User = require('../db/seeds/schemata/User')

exports.selectUsers = async (sort_by = "score", page = 1, period = null) => {
    console.log("in users model")
    const validSortBy = ["score", "time", "created_at"]
    const validPeriod = ["week", "month", "year"]

    if (!validSortBy.includes(sort_by) || (period && !validPeriod.includes(period))) {
        return Promise.reject({ status: 400, msg: "Bad Request"})
    }

    let sort 
    if (sort_by === "score") sort = { "score": 1}
    else if (sort_by === "time") sort = { "time.minutes": 1, "time.seconds": 1 }
    else sort = { "created_at": -1 }

    let currentDate = new Date()
    let datesRange = new Date()
    if (period === "year") datesRange.setFullYear(datesRange.getFullYear() - 1)
    else if (period === "month") datesRange.setMonth(datesRange.getMonth() - 1)
    else if (period === "week") datesRange.setDate(datesRange.getDate() - 7);

    let query = null
    if (period) {
        query = {
            created_at: {
              $gte: datesRange,
              $lt: currentDate,
            },
          };
    }

    const skip = (page - 1) * 10

    try {
        const users = await User.find(query).sort(sort).limit(10).skip(skip)
        return users
    } catch (error) {
        return next(error)
    }
}

exports.selectAllUsers = async () => {
    try {
        const allUsers = await User.find()
        return allUsers.length
    } catch (error) {
        return next(error)
    }
}

exports.insertUser = async (username, score, minutes, seconds) => {
    try {
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
    } catch (error) {
        return Promise.reject({ status: 400, msg: "Bad Request"})
    }
}