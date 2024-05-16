const express=require('express')
const axios=require('axios')
const client=require('./client')
const app=express()
const PORT=4000
app.get('/',async (req,res)=>{
   const cacheTodos=await client.get('Todos')
   if(cacheTodos){
        return res.json({
        data:JSON.parse(cacheTodos)
    })
   }
   const response=await axios.get('https://jsonplaceholder.typicode.com/todos')
   const data=response.data
   await client.set('Todos',JSON.stringify(data))
   await client.expire('Todos',30)
   res.json({
      data
   })
})
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})