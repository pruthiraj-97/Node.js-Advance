const express=require('express')
const redisClient=require('./utils/redis')
const {keyGenerator}=require('./utils/key_generator')
const redisSet=require('./routers/set')
const app=express()
const PORT=4000
app.use(express.json())
app.use('/set',redisSet)
app.get('/',(req,res)=>{
    res.send("Redis-server")
})
app.get('/api/data/:id', async(req,res)=>{
   try {
    const id=req.params.id
    const user={
        name:"pruthiraj",
        id:id,
        age:25
    }
    const key=keyGenerator(id)
    const data=await redisClient.get(key)
    if(data){
        console.log("data in redis",data)
        return res.status(200).json({
            data:user,
            message:"from cache"
        })
    }
    await redisClient.setEx(key,10,JSON.stringify(user)) // user#id will be stored in redis
    return res.status(200).json({
        data:user
    })
   } catch (error) {
    return res.status(500).json({
        message:error.message
    })
   }
})
app.get('/hash/:id',async (req,res)=>{
   try {
    const {id}=req.params
   const ans=await redisClient.hGetAll(`post:${id}`)
   if(Object.keys(ans).length!=0){
    return res.status(200).json({
        status:200,
        data:ans
    })
   }
   const response=await redisClient.hSet(`post:${id}`,{
       name:'pruthiraj',
       id:id,
       age:25,
       service:null || '',
       company:null || '',
       likes:0
    })
//  const isExist=await redisClient.HEXISTS(`user:${id}`,'name') // exist 1 or 0
const result=await redisClient.hGetAll(`post:${id}`)
   return res.status(200).json({
       status:200,
       data:result
   })
   } catch (error) {
     return res.status(500).json({
        error
     })
   }
   // MACHANISM BEHIND HASH
   // hash convert all value to string so it give error for null and undefine value
})
app.listen(PORT,()=>{
   console.log(`server is running ${PORT}`) 
})