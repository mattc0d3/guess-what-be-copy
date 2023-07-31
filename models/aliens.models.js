const db = require("../db/connection");
const mongoose = require('mongoose')
const { chooseAliens } = require('../utils/utils')

exports.selectAliens = () =>{
    
    const allAliens = mongoose.connection.aliens.find()
    console.log(allAliens)
    return chooseAliens(allAliens)
}