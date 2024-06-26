const express=require('express')
const redisClient=require('../utils/redis')
const {postLikeValue,postLikeKey}=require('../utils/key_generator')
const router=express.Router()
router.get('/adduser',async (req,res)=>{
   try {
     const {username}=req.body
     const isMember=await redisClient.sIsMember(username,`username:${username}`)
     if(isMember==1){
        return res.status(400).json({
            status:400,
            message:"user already exist"
        })
     }
     await redisClient.sAdd(username,`username:${username}`)
     return res.status(200).json({
        status:200,
        message:'user added'
     })
   } catch (error) {
     return res.status(500).json({
        error:error.message
     })
   }
})
router.get('/likes/:post/:id',async (req,res)=>{
   try {
      const {post,id}=req.params
      const response=await redisClient.sIsMember(postLikeKey(post),postLikeValue(id))
      console.log(response)
      if(response){
         await redisClient.sRem(postLikeKey(post),postLikeValue(id))
         await redisClient.hIncrBy(`post:${post}`,'likes',-1)
         return res.status(200).json({
            message:'like remove success full'
         })
      }
      else{
         await redisClient.sAdd(postLikeKey(post),postLikeValue(id))
         await redisClient.hIncrBy(`post:${post}`,'likes',1)
         return res.status(200).json({
            message:'like  success full'
         })
      }
      
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         error
      })
   }
})
router.get('/likes/:id',async (req,res)=>{
   // const count=await redisClient.sMembers(postLikeKey(req.params.id))
   const result=await redisClient.hGet(`post:${req.params.id}`,'likes')
   return res.status(200).json({
      count:result
   })
})
module.exports=router