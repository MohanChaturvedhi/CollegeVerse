const express = require('express');
const router = express.Router();
const multer = require('multer');
const PostController = require("../controllers/post");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dgzmqmvfs',
  api_key: '679891316661256',
  api_secret: '3VQGj1e--dPqkgWwWPTF0qRn3Wk'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Images',
    format: async (req, file) => {'png','jpg'}, // supports promises as well
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

const upload = multer({ storage: storage });
 router.get('/',PostController.getAll);
 router.post('/',upload.single('image'), PostController.create);
router.get('/:id',PostController.getPostLikedUsers);


module.exports = router;