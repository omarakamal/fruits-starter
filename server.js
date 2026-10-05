// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const fruitController = require('./routes/fruits.routes')



async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}




conntectToDB() // connect to database






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_zaid'))
app.use(morgan('dev'))





// Routes go here

app.use('/fruits',fruitController)

app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})
 




app.listen(3000,()=>{
    console.log('App is Running')
}) // listen on port 3000
