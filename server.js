//import
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
const username = prompt('What is your name?')
require(dotenv).config()
console.log(process.env.MONGODB_URI)
const express = require(‘express’)
const morgan = require(‘morgan’)


// console.log(`Your name is ${username}`);


//models
const Food = require(‘./models/food.js)

//constants

const app = express()



// Middleware
app.set(‘view engine’, ‘ejs’) 
// This passes the data from the form and adds it to req.body
//Without the below line, req.body will always be undefined
app.use(express.urlencoded({ extended: true }))
app.use(morgan(‘dev’))      // app.use uses all of get/post etc 



// routes
//GET /
app.get(‘/‘, (req, res) => {
Return res.render(‘index.ejs’)
})
// server.js

// GET /food/new
app.get("/new", (req, res) => {
    res.render("/new.ejs");
  });
  
//food/new
App.get(‘/views/new.ejs’, (req, res) => {
    res.render (‘new’)
    })
    

//fruits/create
app.post(‘/food’, req, res) => { 
    req.body.isGoodToEat = Boolean(req.body.isGoodToEat) // Basically makes it so that if not true or false then decline
    const createdFood = await Food.create(req.body)  //USE AWAIT ON PROMISES BUT NOT BOOLEANS
    console.log(createdFood)       
    res.redirect(‘/food’)  // redirect just means the page won’t hang and will redirect to the page
    }
    

//CREATE
const createFood = async () => {
    const newName = prompt(‘What is the dish name?’)
    const customer = await Food.create({ name: bolognese})
    console.log(`food ${name} was created`)
    }

    //food/index
app.get (‘/food’), async (req, res) => {
    const allFoods = await Food.find()
    console.log(food)
    res.render(‘index’, {food : allFoods})  // then make a fruits index ejs where you put the boilerplate in
}





//listen
const express = require("express");
const { TopologyDescriptionChangedEvent } = require('mongodb');
            const app = express();
            app.listen(3000, () => {
            console.log("Listening on port 3000");
            });


//connect
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(process.env.PORT, () => {
    }) catch(error) {
        console.log(error)
    }}
}
connect()