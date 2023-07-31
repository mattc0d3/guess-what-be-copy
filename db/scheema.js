const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    name: String,
    color: String,
    hasAntenna: Boolean
   
})

module.exports = mongoose.model('Alien', alienSchema)