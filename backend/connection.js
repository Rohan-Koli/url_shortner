const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectToDB = async()=>{
    try {
        const url = process.env.db_url
        await mongoose.connect(url)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {connectToDB}