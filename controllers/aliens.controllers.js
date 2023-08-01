const { selectAliens } = require("../models/aliens.models");

exports.getAliens = async (_, res) => {
  try {
    const aliens = await selectAliens();
    res.status(200).send({ aliens });
  } catch (err) {
    res.status(500).send({ msg: "Internal Error" });
  }
};
