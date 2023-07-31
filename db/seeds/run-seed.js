//const seed = require('./seed.js');
const db = require('../connection.js');
const seed = require('./seed.js');
const { attributes, testAttributes} = require('./attributes.js');

const runSeed = () => {
  return seed(attributes).then(() => db.end());
};

runSeed();
