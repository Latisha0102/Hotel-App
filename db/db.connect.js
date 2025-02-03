const mongoose = require('mongoose')

require('dotenv').config()

const mongoUri = process.env.MONGODB

const initializeDatabase = () => {
    mongoose.connect(mongoUri).then(() => console.log("Connected to Database")).catch((error)=> console.log("error in connecting",error))
}

module.exports = {initializeDatabase}