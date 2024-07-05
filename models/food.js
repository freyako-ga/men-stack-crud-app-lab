const mongoose = require ("mongoose")

const foodSchema = new mongoose.Schema({
    name: String,
    isGoodToEat: Boolean
    })
    
    const Food = mongoose.model("Food", foodSchema) ///create model
    
    module.exports = Food