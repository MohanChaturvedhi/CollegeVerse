const Post = require('../models/post');
const { BadRequestError } = require('../middleware/error');

class PostController {
  async create(req, res, next) {
    try {
      const { userId, description } = req.body;
      const image = req.file.path; // Assuming the image file path is provided in req.file
      console.log(userId,description,image)
      if (!userId) throw new BadRequestError("User id is required");
      if (!image) throw new BadRequestError("Image is required");
      if (description.length > 200) throw new BadRequestError("Description is too long");

      const newPost = await Post.create({
        userId,
        image,
        description,
      });

      res.status(201).json({ post: newPost });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const allPosts = await Post.find();
      res.status(200).json({ posts: allPosts });
    } catch (err) {
      next(err);
    }
  }

  async getPostLikedUsers(req,res,next){
    try{
      const postId=req.params.id;
      console.log(postId)
      const post=await Post.findById(postId);
      const users=post.likes;
      res.status(200).json({usernames:users});
      // console.log({users})

    }catch(err){
      console.log(err);
    }
  }
}

module.exports = new PostController();
