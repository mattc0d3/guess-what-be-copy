const seed = require('./seed.js');
const { attributes, testAttributes} = require('./data/attributes.js')
const { questions } = require('./data/questions.js')

const runSeed = async () => {
  await seed(attributes, questions)
};

runSeed();
