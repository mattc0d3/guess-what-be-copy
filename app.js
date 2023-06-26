const express = require('express')
const {getTopics} = require('./controllers/ncnews.controllers')
const app = express()

app.get('/api/topics', getTopics)

app.use((err, req, res, next) =>{
    if(err.code === '22P02'){
        console.log(err)
        res.status(404).send({message:'Not found'})
    }
   
})

module.exports = app