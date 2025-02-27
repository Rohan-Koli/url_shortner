const express =require("express")
const dotenv = require("dotenv")
const {connectToDB} = require("./connection")
const urlRouter = require("./routes/urlRoutes")
const cors = require("cors")
const path = require("path")
const app = express()
const corsOptions = {
    origin :"https://url-shortner-1-cp7p.onrender.com"
}
app.use(cors(corsOptions))
dotenv.config()
const PORT = process.env.PORT

const _dirname = path.resolve()
app.use(express.json());
connectToDB()

app.use("/api/url",urlRouter)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
app.listen(PORT,)

