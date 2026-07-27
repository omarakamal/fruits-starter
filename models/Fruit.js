const mongoose = require('mongoose')


// Schema
const fruitSchema = new mongoose.Schema({
    name:{
        type: String
    },
    isReadyToEat:{
        type: Boolean
    },
    category:{
        type: String
    }
})


// model
const Fruit = mongoose.model('Fruit',fruitSchema)

module.exports = Fruit