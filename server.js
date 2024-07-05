//import
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
require(dotenv).config();
console.log(process.env.MONGODB_URI);
const express = require('express');
const morgan = require('morgan')


// console.log(`Your name is ${username}`);


//models
const Food = require('./models/food.js')

//constants

const app = express()



// Middleware
app.set('view engine', 'ejs') // don't need to put .ejs because this sets it
// This passes the data from the form and adds it to req.body
//Without the below line, req.body will always be undefined
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))      // app.use uses all of get/post etc 



// routes
//GET /
app.get('/', (req, res) => {
    return res.render('index')
})
// server.js

// GET /food/new
app.get("/new", (req, res) => {
    res.render("/new");
});

//food/new
app.get('/views/new.ejs', (req, res) => {
    res.render('new')
})




//CREATE - organisation - give the user the option to view the form
const createFood = async () => {
    const newName = prompt('What is the dish name?')
    const customer = await Food.create({ name: String })
    console.log(`food ${newName} was created`)
}



//second part of create - for the web brower - takes the organised folder and puts it in the database
app.post('/food', async (req, res) => {
    req.body.isGoodToEat = Boolean(req.body.isGoodToEat) // Basically makes it so that if not true or false then decline
    const createdFood = await Food.create(req.body)  //USE AWAIT ON PROMISES BUT NOT BOOLEANS
    console.log(createdFood)
    res.redirect('/food')  // redirect just means the page won’t hang and will redirect to the page
})

//food/index
app.get('/food'), async (req, res) => {
    const allFoods = await Food.find()
    console.log(food)
    res.render('index', { food: allFoods })  // then make a fruits index ejs where you put the boilerplate in
}





//listen 
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(process.env.PORT, () => {
            console.log(error)
        })
    }
    catch (error) {
    }
}
connect()