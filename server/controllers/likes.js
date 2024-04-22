const Likes=require('../models/likes')
const User=require("../models/auth")
const Post=require("../models/post")

class LikesController {

  async postLike(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.body.userId;
      let like = await Likes.findOne({ postId: postId, userId: userId });
      if (!like) {
        like = new Likes({
          postId: postId,
          userId: userId,
          liked: true
        });
      } else {
        like.liked = !like.liked;
      }
      await like.save();
      const likedUsers = await Likes.find({ postId: postId, liked: true }).populate('userId', 'username');
      const usernames = likedUsers.map(likedUser => likedUser.userId.username);
      await Post.findByIdAndUpdate(postId, { $set: { likes: usernames } });

      res.status(200).json({ like });
    } catch (err) {
      console.log(err);
    }
  }


async allPosts(req,res,next){
     try{
       const userId=req.params.id;
       const postIds=await Likes.find({userId:userId,liked:true});
      //  console.log(postIds);
      const posts = await Post.find({ _id: { $in: postIds.map(post => post.postId) } });
       console.log(posts);
       res.status(200).json({posts});
     }catch(err){
      console.log(err);
     }
}
}

module.exports = new LikesController();
