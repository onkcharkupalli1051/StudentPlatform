const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(colors.bgGreen.white(`MongoDB connected ${mongoose.connection.host}`))
    } catch (error) {
        console.log(colors.bgRed.white(`Mongodb server Issue ${error}`))
    }
}

module.exports = connectDB