const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.db_url)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {connectToDB}