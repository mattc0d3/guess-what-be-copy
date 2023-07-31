const mongoose = require('mongoose')
const chooseAliens = require('../utils/utils')
const Alien = require("../db/seeds/Alien");

exports.selectAliens = async () =>{
    const aliens = await Alien.find()
    console.log(aliens.length, "<<<<<<<<<<<<< aliens length")
    const randomAliens = chooseAliens(aliens)
    return randomAliens
}