const db = require("../connection");
const mongoose = require("mongoose");
const Alien = require("../scheema");
const data = require('../data/aliensData')
const chooseAliens = require('../seeds/utils')

mongoose.connect("mongodb://localhost/aliendb");

async function createAlien() {
  const alien = await Alien.create(chooseAliens(data));
}
const seed = () => {
  return createAlien();
};

seed()

module.exports = seed