const mongoose = require("mongoose");
const Alien = require("./Alien");
const Question = require("./Question");
const connectDB = require("../connectMongo");
const formatQuestions = require("../../utils/formatQuestions");

connectDB();

async function seed(attributes, questions) {
  // await mongoose.connection.collection("aliens").deleteMany({});
  await mongoose.connection.collection("questions").deleteMany({});

  // async function seedAliens(attributes, currentCombination = {}) {
  //   const attributeKeys = Object.keys(attributes);

  //   if (attributeKeys.length === 0) {
  //     const alien = new Alien(currentCombination);
  //     await alien.save();
  //     return;
  //   }

  //   const attributeKey = attributeKeys[0];
  //   const attributeValues = attributes[attributeKey];

  //   for (const value of attributeValues) {
  //     const newCombination = { ...currentCombination, [attributeKey]: value };
  //     const remainingAttributes = { ...attributes };
  //     delete remainingAttributes[attributeKey];
  //     seedAliens(remainingAttributes, newCombination);
  //   }
  // }
  // await seedAliens(attributes);

  async function seedQuestions(attributes, questions) {
    for (const attribute in attributes) {
      if (attribute === "isActive") break;
      attributes[attribute].forEach(async (variation) => {
        const questionObj = {
          alienProp: attribute,
          checkFor: variation,
          question: questions[attribute][variation] + "?"
          // question: formatQuestions(attribute, variation)
        };
        const question = new Question(questionObj);
        await question.save();
      });
    }
    //   const allQuestionsData = {};

    //   for (const attribute in attributes) {
    //     if (attribute === "isActive") break;
    //     allQuestionsData[attribute] = attributes[attribute].map((variation) => {
    //       return {
    //         checkFor: variation.toString(),
    //         question: formatQuestions(attribute, variation),
    //       };
    //     });
    //   }
    //   await AllQuestions.create(allQuestionsData);
  }
  await seedQuestions(attributes, questions);

  console.log("Data seeded successfully");
  // await mongoose.connection.close();
}
module.exports = seed;
