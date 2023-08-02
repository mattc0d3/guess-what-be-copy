const seed = require('./seed.js');
const { attributes, testAttributes} = require('./attributes.js');

const runSeed = async () => {
  await seed(attributes)
};

runSeed();
