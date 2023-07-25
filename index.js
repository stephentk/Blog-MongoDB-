const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("dbconnection successful")).catch((err) =>{
    console.log(err)
})

app.use(express.json())
app.get("/api/test",() => {
    console.log('test successful')
})
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.listen(3000,() => {
    console.log("server running ")
})