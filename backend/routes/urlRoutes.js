const urlRouter = require("express").Router()
const {addData,getData,deleteData} = require("../controllers/urlControllers")

urlRouter.get("/",getData)
urlRouter.post("/",addData)
urlRouter.delete("/:id",deleteData)
module.exports = urlRouter

