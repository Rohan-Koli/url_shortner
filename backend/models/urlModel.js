const mongoose= require("mongoose")

const urlSchema = new mongoose.Schema({
    originalURL:String,
    shortURL:String
})

const urlModel = mongoose.model("url",urlSchema)

module.exports = urlModel