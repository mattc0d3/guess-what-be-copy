const mongoose = require("mongoose");
const Alien = require("./Alien");
const connectDB = require('../connectMongo')

connectDB()

async function seed(attributes) {
  
  // await mongoose.connection.collections["aliens"].drop(async (err) => {
  //   await console.log("collection dropped");
  // });

  await mongoose.connection.collection('aliens').deleteMany({})

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
}

module.exports = seed;
