require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()

app.use(express.json())

connectToDatabase()
app.post("/blog",function(req,res){
    console.log(req.body)
    res.status(200).json({
        message: "blog api hit successfully!"
    }  )
})


app.get("/", function(req, res){
    res.status(200).json({
        message : "this this home page"
    })
})
  

app.listen(process.env.PORT,()=>{
    console.log("project start successfully")
})


// mongodb+srv://nirmalbsccsit2:<db_password>@cluster0.oh1y9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0