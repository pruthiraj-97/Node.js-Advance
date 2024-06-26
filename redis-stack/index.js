const express=require('express')
const axios=require('axios')
const client=require('./client')
const app=express()
const PORT=4000
app.get('/gettodos',async (req,res)=>{
})
app.post('/addtodo',(req,res)=>{
   const {title,description}=req.body
   if(!title || !description){
    return res.status(400).json({
        message:"title or description is missing"
    })
   }
})
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})