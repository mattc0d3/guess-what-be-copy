const { selectAliens } = require("../models/aliens.models");

exports.getAliens = async (_, res) => {
  try {
    const aliens = await selectAliens();
    res.status(200).send({ aliens });
  } catch (error) {
    return next(error)
  }
};
