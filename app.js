require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs')
const { timeLog } = require('console')

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
// for getting all blogs
app.get("/blog", async(req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json({
        message :" blog data featched successfully!!",
        data : blogs
    })
})


 //for gettting single blog
app.get("/blog/:id", async(req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(404).json({
            message:"No data find"
            
        })
    }
    res.status(200).json({
        message:"data featched successfully!",
        data : blog
    })
})


//for deleting blogs

app.delete("/blog/:id", async(req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image
    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("file deleted successfully!")
        }
    })
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "blog deleteed successfully!!"
    })
})


//blog update wala
app.patch("/blog/:id", upload.single('image'), async (req, res) => {
    const id = req.params.id;
    const { title, subtitle, description } = req.body;

    let filename;

    if (req.file) {
        filename = req.file.filename; 
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!"
            });
        }

        const oldImageName = blog.image;

        
        fs.unlink(`storage/${oldImageName}`, (err) => {
            if (err) {
                console.error("Error deleting old file:", err);
            } else {
                console.log("Old file deleted successfully!");
            }
        });
    }

    await Blog.findByIdAndUpdate(
        id,
        {
            title,
            subtitle,
            description,
            ...(filename && { image: filename }) // Only update image if a new file is uploaded.
        }
    );

    res.status(200).json({
        message: "Blog updated successfully!!"
    });
});








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