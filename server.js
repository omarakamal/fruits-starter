// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const Fruit = require('./models/Fruit')
const methodOverride = require('method-override')
const morgan = require('morgan')



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

app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})


// Create routes
app.get('/fruits/new', (req,res)=>{
    res.render('fruit-create.ejs')
})

app.post('/fruits', async (req,res)=>{

    try{
    req.body.isReadyToEat = Boolean(req.body.isReadyToEat)
    console.log(req.body)
    const createdFruit = await Fruit.create(req.body)
    console.log(createdFruit._id)
    res.redirect('/')

    }
    catch(err){
        console.log(err)
    }
    
})


// Read Routes

app.get('/fruits', async (req,res)=>{
    const allFruits = await Fruit.find()
    res.render('all-fruits.ejs',{fruits: allFruits})
})


app.get('/fruits/:id', async (req,res)=>{
    console.log(req.params.id)
    const foundFruit = await Fruit.findById(req.params.id)
    console.log(foundFruit)
    res.render('fruit-details.ejs',{fruit: foundFruit})
})



app.delete('/fruits/:id',async(req,res)=>{
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect('/fruits')
})
// Exercise 1:
// In the views create a homepage.ejs file. In the file welcome user to our application
// create a app.get() route on the / route that sends back the homepage.ejs (REMEMBER: res.render('homepage.ejs'))




app.get('/fruits/:id/edit', async (req,res)=>{
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('edit-fruit.ejs', {fruit: foundFruit})
})


app.put('/fruits/:id',async (req,res,)=>{
    req.body.isReadyToEat = Boolean(req.body.isReadyToEat)
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/fruits')
})

// Exercise 2:
// 1. Create a edit-fruit.ejs page with an <h1>Fruit edit</h1>
// 2. Create a app.get('/fruits/:id/edit') that when the request is sent responds with edit-fruit.ejs
// 3. BONUS: in your fruit-details.ejs make a button when clicked sends get request to /fruits/ID-OF-FRUIT/edit

 
 
 
 




app.listen(3000,()=>{
    console.log('App is Running')
}) // listen on port 3000
