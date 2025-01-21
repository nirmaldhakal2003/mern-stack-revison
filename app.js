require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()

app.use(express.json())

connectToDatabase()
app.post("/blog",async (req,res)=>{
    // const title = req.body.title
    // const description = req.body.description
    // const subtitle = req.body.subtitle
    // const image = req.body.image
    
    const {title, subtitle, description, image} = req.body
    if(!title || !subtitle || !description || !image){
        return res.status(404).json({
            message : "Please enter title, subtitle, decription, image"
        })
    }
    await Blog.create({
        title : title,
        subtitle :subtitle,
        description : description,
        image : image
    })

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