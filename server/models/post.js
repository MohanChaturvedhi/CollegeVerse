const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    likes:[{
      type:String,
    }]
},{ timestamps:true })

module.exports=mongoose.model('Post',PostSchema);