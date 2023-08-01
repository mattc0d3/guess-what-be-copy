const mongoose = require("mongoose");
const Alien = require("./Alien");
const Question = require("./Question");
const connectDB = require("../connectMongo");

connectDB();

async function seed(attributes) {
  await mongoose.connection.collection("aliens").deleteMany({});
  await mongoose.connection.collection("questions").deleteMany({});

  async function seedAliens(attributes, currentCombination = {}) {
    const attributeKeys = Object.keys(attributes);

    if (attributeKeys.length === 0) {
      const alien = new Alien(currentCombination);
      await alien.save();
      return;
    }

    const attributeKey = attributeKeys[0];
    const attributeValues = attributes[attributeKey];

    for (const value of attributeValues) {
      const newCombination = { ...currentCombination, [attributeKey]: value };
      const remainingAttributes = { ...attributes };
      delete remainingAttributes[attributeKey];
      seedAliens(remainingAttributes, newCombination);
    }
  }
  await seedAliens(attributes);

  async function seedQuestions(attributes) {
    attributes.skinColour.forEach(async (colour) => {
      const question = new Question({ question: `${colour} skin?` });
      await question.save();
    });
    attributes.horns.forEach(async (number) => {
      const question = new Question({
        question: `${number > 0 ? number : ""} horns?`,
      });
      await question.save();
    });
    attributes.eyes.forEach(async (number) => {
      const question = new Question({
        question: `${number} eye${number > 1 ? "s" : ""}?`,
      });
      await question.save();
    });
    attributes.eyeColour.forEach(async (colour) => {
      const question = new Question({ question: `${colour} eyes?` });
      await question.save();
    });
    attributes.skinTexture.forEach(async (texture) => {
      const question = new Question({ question: `${texture} skin?` });
      await question.save();
    });
    attributes.planet.forEach(async (climate) => {
      const question = new Question({
        question: `a${climate === "ice" ? "n" : ""} ${climate} planet?`,
      });
      await question.save();
    });
    const antennaQuestion = new Question({ question: "antenna?" });
    await antennaQuestion.save();

    const friendlyQuestion = new Question({ question: `a friendly face?` });
    await friendlyQuestion.save();
  }
  await seedQuestions(attributes);
}

module.exports = seed;
