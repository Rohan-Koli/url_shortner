const urlModel = require("../models/urlModel")

const addData = async(req,res)=>{
    try {
        const {inputUrl} = req.body
        if(!inputUrl){
            return res.status(400).json({
                error:"URL is required",
                status:0
            })
        }
        const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let result =""
        for(let i=0;i<7;i++){
            randomIndex = Math.floor(Math.random() * characters.length)
            result = result +characters[randomIndex]
        }
        const newUrl = await urlModel.create({originalURL:inputUrl,shortURL:result})
        return res.status(200).json({
            message:"data added successfully",
            status:1,
            data:newUrl
        })
    } catch (error) {
        return res.status(500).json({
            status:0,
            message:"can not add data",
            error:error.message
        })
    }
}

const getData = async(req,res)=>{
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const skip = (page-1) * limit
        const result = await urlModel.find().skip(skip).limit(limit)
        const total = await urlModel.countDocuments()
        return res.status(200).json({
            message:"data fetched successfully",
            status:1,
            total:total,
            totalPages: Math.ceil(total / limit),
            currentPage:page,
            data:result
        })
    } catch (error) {
        return res.status(400).json({
            message:"can not fetched data",
            status:0,
            error:error.message
        })
    }
}

const deleteData = async(req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:"URL not found",
                status:0
            })
        }
        const result = await urlModel.deleteOne({_id:id})
        if(result){
            return res.status(200).json({
                status:1,
                message:"URL deleted successfully",
                data:result._id
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:0,
            message:"Can not delete data",
            error:error.message
        })
    }
}

module.exports = {addData,getData,deleteData}