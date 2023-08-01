const mongoose = require('mongoose')

// console.log(process.env.NODE_ENV)
// const ENV = process.env.NODE_ENV || 'development'

const connectDB = async () =>{
    try{
        // await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        await mongoose.connect("mongodb://127.0.0.1/guess_what");
        console.log('Connected to MongoDB successfully')

    }catch(error){
        console.log('Connection failed', error.message)
    }
}

module.exports = connectDB