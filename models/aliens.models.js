const chooseAliens = require('../utils/chooseAliens')
const Alien = require("../db/seeds/schemata/Alien");

exports.selectAliens = async () => {
    try {
        const aliens = await Alien.find()
        const randomAliens = chooseAliens(aliens)
        return randomAliens
    } catch (error) {
        return next(error)
    }
}