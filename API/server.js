const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const app =express()
app.use(express.json({limit:"200mb"}))
app.use(express.urlencoded({limit:'200mb',extended:true}))
app.use(cors())

let indexRoute = require('./Routes/index')

app.use('/API',indexRoute)

const port = process.env.PORT

const connectionstr = process.env.MONGO_HOST

mongoose.connect(connectionstr,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("DB conneted succesfully")
})
.catch((error)=>{
console.log("Error:  ", error)
})

app.listen(port ,()=>{
    console.log("Listining to port",port)
})