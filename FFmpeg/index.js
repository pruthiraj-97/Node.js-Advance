const express=require('express')
const app=express()
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const PORT=4000
app.use(cors({
    origin:["http://localhost:3000","http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use("/uploads",express.static("uploads"))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+path.extname(file.originalname))
    }
})

// multer configuration
const upload=multer({storage:storage})


app.get('/',(req,res)=>{
    res.send("Node.js video streaming")
})
app.post('/upload',upload.single('file'),(req,res)=>{
    
    res.send("file uploaded")
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})