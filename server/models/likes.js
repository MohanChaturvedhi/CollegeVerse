const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    liked:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Likes',LikeSchema);