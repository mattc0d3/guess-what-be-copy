const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema({
    checkFor: String,
    question: String,
  });
  
  const allQuestionsSchema = new Schema({
    skinColour: [questionSchema],
    skinTexture: [questionSchema],
    eyes: [questionSchema],
    eyeColour: [questionSchema],
    horns: [questionSchema],
    hasAntenna: [questionSchema],
    isFriendly: [questionSchema],
    planet: [questionSchema],
  });
  
  const AllQuestions = mongoose.model('Questions', allQuestionsSchema);
  
  module.exports = AllQuestions;