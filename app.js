const express = require('express')
const {getTopics} = require('./controllers/ncnews.controllers')
const app = express()

app.get('/api/topics', getTopics)

app.all('*', (req, res) =>{
   res.status(404).send({message:'Not found'})
})

module.exports = app