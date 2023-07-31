const db = require("../db/connection");
const mongoose = require('mongoose')
const { chooseAliens } = require('../utils/utils')

exports.selectAliens = () =>{

    const allAliens = db.aliens.find()
    return chooseAliens(allAliens)
}