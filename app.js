const express = require('express')
const connectToDatabase = require('./database')
const app = express()

connectToDatabase()
app.get("/about",function(req,res){
    res.status(200).json({
        name: "my name is nirmal dhakal"
    }  )
})

app.get("/", function(req, res){
    res.status(200).json({
        message : "this this home page"
    })
})
  

app.listen(5000,()=>{
    console.log("project start successfully")
})


// mongodb+srv://nirmalbsccsit2:<db_password>@cluster0.oh1y9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0