const selectAliens = require('../models/selectAliens')

exports.getAliens = (req, res, next) =>{
    
    selectAliens()
    .then((aliens) =>{
        res.status(200).send({ aliens })
    })
    .catch(next)
}