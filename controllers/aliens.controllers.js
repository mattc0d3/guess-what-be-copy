const  { selectAliens }  = require('../models/aliens.models')

exports.getAliens = (req, res, next) =>{
    selectAliens()
    .then((aliens) =>{
        res.status(200).send({ aliens })
    })
    .catch(next)
}