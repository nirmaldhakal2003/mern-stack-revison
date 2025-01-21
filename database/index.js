const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect('mongodb+srv://nirmalbsccsit2:nirmal12@cluster0.oh1y9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


    console.log("Database connected successfully!!")
}

module.exports = connectToDatabase