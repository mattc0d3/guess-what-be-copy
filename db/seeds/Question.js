const mongoose = require('mongoose')
const { Schema } = mongoose

// const questionSchema = new Schema({
//     checkFor: String,
//     question: String,
//   });
  
//   const allQuestionsSchema = new Schema({
//     skinColour: [questionSchema],
//     skinTexture: [questionSchema],
//     eyes: [questionSchema],
//     eyeColour: [questionSchema],
//     horns: [questionSchema],
//     hasAntenna: [questionSchema],
//     isFriendly: [questionSchema],
//     planet: [questionSchema],
//   });

const questionSchema = new mongoose.Schema({
    alienProp: String,
    checkFor: mongoose.Schema.Types.Mixed,
    question: String
})
  
  const Question = mongoose.model('Question', questionSchema);
  
  module.exports = Question;