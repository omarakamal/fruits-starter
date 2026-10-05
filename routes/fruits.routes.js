const router = require('express').Router()
const Fruit = require('../models/Fruit')


// Create routes
router.get('/new', (req,res)=>{
    res.render('fruit-create.ejs')
})

router.post('/', async (req,res)=>{

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

router.get('/', async (req,res)=>{
    const allFruits = await Fruit.find()
    res.render('all-fruits.ejs',{fruits: allFruits})
})


router.get('/:id', async (req,res)=>{
    console.log(req.params.id)
    const foundFruit = await Fruit.findById(req.params.id)
    console.log(foundFruit)
    res.render('fruit-details.ejs',{fruit: foundFruit})
})



router.delete('/:id',async(req,res)=>{
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect('/fruits')
})
// Exercise 1:
// In the views create a homepage.ejs file. In the file welcome user to our routerlication
// create a router.get() route on the / route that sends back the homepage.ejs (REMEMBER: res.render('homepage.ejs'))




router.get('/:id/edit', async (req,res)=>{
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('edit-fruit.ejs', {fruit: foundFruit})
})


router.put('/:id',async (req,res,)=>{
    req.body.isReadyToEat = Boolean(req.body.isReadyToEat)
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/fruits')
})

// Exercise 2:
// 1. Create a edit-fruit.ejs page with an <h1>Fruit edit</h1>
// 2. Create a router.get('/fruits/:id/edit') that when the request is sent responds with edit-fruit.ejs
// 3. BONUS: in your fruit-details.ejs make a button when clicked sends get request to /fruits/ID-OF-FRUIT/edit

 
 
 




module.exports = router