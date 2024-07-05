Const foodSchema = new mongoose.Schema({
    name: String,
    isGoodToEat: Boolean;
    })
    
    Const Food = mongoose.model(‘Food’, foodSchema) ///create model
    
    module.exports = Food