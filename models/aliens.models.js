const chooseAliens = require('../utils/chooseAliens')
const Alien = require("../db/seeds/schemata/Alien");

exports.selectAliens = async () => {
    try {
        const aliens = await Alien.find()
        // console.log(aliens.length, "<<<<<<<<<<<<< aliens length")
        const randomAliens = chooseAliens(aliens)
        return randomAliens
    } catch (err) {
        res.status(500).send({ msg: "Internal Error" })
    }
}