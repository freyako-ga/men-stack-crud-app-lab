//import
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGODB_URI);
const express = require('express');
const morgan = require('morgan');
const methodOverride = require("method-override");
const path = require("path")

//models
const Food = require('./models/food.js')



//constants

const app = express()



// Middleware
app.set('view engine', 'ejs'); // don't need to put .ejs because this sets it
// This passes the data from the form and adds it to req.body
//Without the below line, req.body will always be undefined
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));      // app.use uses all of get/post etc 
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));


// routes
//GET /
app.get('/', (req, res) => {
    return res.render('index')
})
// server.js

// GET /food/new
app.get("/foods/new", (req, res) => {
    res.render('foods/new')
});


//food/show
app.get("/foods/:foodId", async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId);
    res.render('show', { food: foundFood });
});


//CREATE - organisation - give the user the option to view the form





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


//food/delete
app.delete("/food/:foodId", async (req, res) => {
    await Food.findByIdAndDelete(req.params.foodId);
    res.redirect("/food");
});



// food/edit
app.get("/food/:foodId/edit", async (req, res) => {
    const foundFoor = await Food.findById(req.params.foodId);
    console.log(foundFood);
    res.send(`This is the edit route for ${foundFood.name}`);
});

app.put('/food/:foodId', async (req, res) => {
    const foodId = req.params.foodId
    await Food.findByIdandUpdate(foodId, req.body)
    res.redirect(`foods/${foodId}`)
})



//food/update

app.put("/food/:foodId", async (req, res) => {
    if (req.body.isGoodToEat === "on") {
      req.body.isGoodToEat = true;
    } else {
      req.body.isGoodToEat = false;
    }
    
    // Update the food in the database
    await Food.findByIdAndUpdate(req.params.foodId, req.body);
  
    // Redirect to the food's show page to see the updates
    res.redirect(`/food/${req.params.foodId}`);
  });
  



//listen 
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DATABASE HAS BEEN CONNECTED')
        app.listen(process.env.PORT, () => {
            console.log(`server connected on ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}
connect()