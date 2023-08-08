const Question = require("../db/seeds/schemata/Question")

exports.selectQuestions = async () => {
    try {
        const questions = await Question.find()
        return questions
    } catch (error) {
        return next(error)
    }
}