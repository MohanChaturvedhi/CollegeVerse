const express=require('express');
const router=express.Router();
const {requireAuth}=require('../middleware/auth')

router.use("/auth",require("./auth"));
router.use("/post",requireAuth,require("./post"));
router.use("/likes",requireAuth,require("./likes"));


module.exports=router;