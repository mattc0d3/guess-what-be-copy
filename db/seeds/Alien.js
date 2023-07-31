const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    skinColour: String,
    skinTexture: String,
    eyes: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    horns: {
        type: Number,
        min: 0,
        max: 4,
        required: true,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    eyeColour: String,
    isFriendly: Boolean,
    hasAntenna: Boolean,
    planet: String
})

module.exports = mongoose.model("Alien", alienSchema)