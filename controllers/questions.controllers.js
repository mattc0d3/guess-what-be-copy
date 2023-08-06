const { selectQuestions } = require('../models/questions.models')

exports.getQuestions = async (_, res) => {
    try {
        const questions = await selectQuestions()
        res.status(200).send({ questions })
    } catch (err) {
        res.status(500).send({ msg: "Internal Error" })
    }
}