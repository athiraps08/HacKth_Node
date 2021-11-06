const mongoose=require('mongoose')
let MongoSchema=mongoose.Schema

//Model creation
const foodSchema=new MongoSchema(
    {
        dish:String,
        category:String,
        ingredients:String,
        receipe:String,
        time:String,
        nutrition:String
        
    })

    var foodModel=mongoose.model("foods",foodSchema)
    module.exports={foodModel}