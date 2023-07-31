const mongoose = require("mongoose");
const Alien = require("./Alien");

mongoose.connect("mongodb://localhost/guess_what");

async function seed(attributes) {
  

  // mongoose.connection.collections['aliens'].drop( function(err) {
  //   console.log('collection dropped');
  // });
  seedAliens(attributes)


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

  ;
}
module.exports = seed