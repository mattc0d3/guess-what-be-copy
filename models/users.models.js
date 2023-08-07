const User = require('../db/seeds/schemata/User')

exports.selectUsers = async (sort_by = "score", page = 1, period = null) => {
    console.log("in users model")
    const validSortBy = ["score", "time", "created_at"]
    const validPeriod = ["week", "month", "year"]

    if (!validSortBy.includes(sort_by) || (period && !validPeriod.includes(period))) {
        console.log("CAUGHT THE INVALID QUERY")
        // return res.status(400).send({ msg: "Bad Request" })
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

    // let query = {}
    // console.log(datesRange, "<<<<< datesRange")
    // if (period === null) {
    //     query = {
    //         created_at: {
    //           $lt: currentDate,
    //         }}
    // } else {
    //     query = {
    //         created_at: {
    //           $gte: datesRange,
    //           $lt: currentDate,
    //         },
    //       };
    // }

    let query = null
    if (period) {
        query = {
            created_at: {
              $gte: datesRange,
              $lt: currentDate,
            },
          };
    }

    // const currentDate = new Date()
    // const priorMonthInSecs = currentDate.setMonth(currentDate.getMonth() - 1)
    // console.log(priorMonthInSecs, "<<<<< prior month in secs")
    // const priorMonth = new Date(priorMonthInSecs).toISOString()
    // console.log(priorMonth, "<<<< priorMonth")

    // if (period === "allTime") datesRange = null
    // else if (period === "year") datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getMonth() - 1)}}
    // else if (period === "month") {
    //     const previousMonth = new Date(1331209044000).toISOString();
    //     datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getMonth() - 1)}}
    // } 
    // else if (period === "week" )datesRange = {"created_at.getTime()": {$gte: currentDate.setMonth(currentDate.getDay() - 7)}}

    // console.log(datesRange, "<<<<<<<< datesRange")

    const skip = (page - 1) * 10
    console.log(skip, "<<<<< SKIP")

    // const today = new Date();
    // const oneMonthAgo = new Date();
    // // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    // // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // // Query the collection
    // const query = {
    //   created_at: {
    //     $gte: oneMonthAgo,
    //     $lt: today,
    //   },
    // };

    try {
        const users = await User.find(query).sort(sort).limit(10).skip(skip)
        return users

    } catch (err) {
        return res.status(500).send({ msg: "Internal Error" })
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
        return Promise.reject({ status: 400, msg: "Bad Request"})
        return res.status(400).send({ msg: "Bad Request"})
    }
}