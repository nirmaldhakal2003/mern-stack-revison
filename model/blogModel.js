const mongoose = require('mongoose')
const Schema = new Schema()
 

const blogSchema = new Schema({
    title : {
        type : String
    },
    subtitle : {
        type : String
    },
    description: {
        type: Text   
    },
    image : {
        type : String
    }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog