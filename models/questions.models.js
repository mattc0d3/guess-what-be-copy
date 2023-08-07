const Question = require("../db/seeds/schemata/Question")

exports.selectQuestions = async () => {
    try {
        const questions = await Question.find()
        return questions
    } catch (err) {
        res.status(500).send({ msg: "Internal Error" })
    }
}