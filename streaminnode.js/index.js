const express=require('express')
const fs=require('fs')
const app=express()
const PORT=4000
app.get('/file',(req,res)=>{
   fs.readFile('file.txt',(err,data)=>{
      if(err){
       return res.send("error in fetching")
      }
      console.log(data) // this data is in the form of a byte code
      res.send(data.toString())
   })
})

app.get('/stream',(req,res)=>{
    // streaming on reading a file
    const streamfile=fs.createReadStream('fie.txt')
    streamfile.on('data',(chunk)=>{
        console.log(chunk)
        res.write(chunk)
    })
    streamfile.on('end',()=>{
        res.end()
    })
    streamfile.on('error',(err)=>{
        res.end("file not found")
    })
    // it is downloading in .send method

    // METHOD 2
    const rstream=fs.createReadStream('file.txt')
    // speed effective
    rstream.pipe(res)
})
app.listen(PORT,()=>{
   console.log(`server
    is running`)
})