const express = require('express');
const router = express.Router();
const LikesController = require("../controllers/likes");

 router.post('/:id',LikesController.postLike)
 router.get('/:id',LikesController.allPosts)


module.exports = router;