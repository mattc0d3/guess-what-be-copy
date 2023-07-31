const seed = require('./seed.js');
const mongoose = require("mongoose")
const { attributes, testAttributes} = require('./attributes.js');

const runSeed = () => {
  return seed(attributes)
};

runSeed();
