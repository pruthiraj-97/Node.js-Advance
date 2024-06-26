const mongoose=require('mongoose')
const Todos=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('Todo',Todos)