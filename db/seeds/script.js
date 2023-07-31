const mongoose = require("mongoose");
const Alien = require("./Alien");

mongoose.connect("mongodb://127.0.0.1/guess_what");

const attributes = {
  skinColour: ["blue", "purple", "green"],
  horns: [0, 2, 4],
  eyes: [1, 2, 3, 4, 5],
  eyeColour: ["red", "yellow", "orange"],
  hasAntenna: [true, false],
  isFriendly: [true, false],
  skinTexture: ["furry", "scaly", "normal"],
  planet: ["desert", "ice", "lava"],
};

run();
async function run() {
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

  seedAliens(attributes);
}