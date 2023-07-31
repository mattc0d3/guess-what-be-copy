const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log('Connected to MongoDB successfully')

    }catch(error){
        console.log('Connection failed', error.message)
    }
}

module.exports = connectDB