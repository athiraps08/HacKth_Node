const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {foodModel}=require('./model')
const { response } = require('express')

let app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//CORS Policy
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

//db connect
mongoose.connect("mongodb+srv://Athira:Athi@cluster0.ltbk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


//Routes

app.get('/',(req,res)=>{
    res.send("helloooo")
})
//FoodView....

app.get('/view',async(req,res)=>{
    try{
        var result=await foodModel.find()
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)

    }
})





app.post('/addr',async(req,res)=>{
    
        console.log(req.body)
        let food=new foodModel(req.body)
        let result=await food.save()
     
        res.json(result)
         
    }    
   
    
    
    )
    

//Delete
app.post('/delete',async(req,res)=>{
    try{
        var result=await foodModel.findByIdAndDelete(req.body)
        res.json({"status":"Successfully deleted..."})
    }
    catch(error){
        res.send(500).json({"status":error})
    }
})

//Update
app.post('/update',async(req,res)=>{
    try{
        var result=await foodModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"UPDATED..."})
    }
    catch(error){
        res.send(500).json({"status":error})
    }
})


app.post('/search',async(req,res)=>{
    try{
        var result=await foodModel.find({"dish":{$regex:'.*'+req.body.dish+'.*'}})
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

//search single
app.post('/searchUpdt',async(req,res)=>{
    try{
        var result=await movModel.find(req.body)
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})






//to run servet

app.listen(8080,()=>{
    console.log('Running...')
})

