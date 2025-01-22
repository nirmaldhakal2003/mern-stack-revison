require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})

app.use(express.json())

connectToDatabase()
app.post("/blog",upload.single('image') , async (req,res)=>{
    // const title = req.body.title
    // const description = req.body.description
    // const subtitle = req.body.subtitle
    // const image = req.body.image
    
    const {title, subtitle, description, image} = req.body
      console.log(req.body)
     const filename = req.file.filename
     console.log(req.file.filename)
    if(!title || !subtitle || !description){
        return res.status(404).json({
            message : "Please enter title, subtitle, decription, image"
        })
    }
  
    await Blog.create({
        title : title,
        subtitle :subtitle,
        description : description,
        image : filename
    })

    res.status(200).json({
        message: "blog api hit successfully!"
    }  )
})

app.get("/blog", async(req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json({
        message :" blog data featched successfully!!",
        data : blogs
    })
})


app.get("/", function(req, res){
    res.status(200).json({
        message : "this this home page"
    })
})

app.use(express.static('./storage'))  // kun chai kura lie access dine internet ma ... eg ('./')matra hanne ho vane , sabai code ko access gayo internet ma 

  

app.listen(process.env.PORT,()=>{
    console.log("project start successfully")
})


// mongodb+srv://nirmalbsccsit2:<db_password>@cluster0.oh1y9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0