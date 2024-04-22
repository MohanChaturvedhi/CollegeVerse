const { BadRequestError ,UnauthorizedError} = require("../middleware/error");
const User=require("../models/auth");
const {hashPassword,comparePassword}=require("../utils/password");
const {generateToken}=require("../utils/jwt");


class AuthController {
    async signup(req, res, next) {   
        try{
            const {username, email, password} = req.body;
        //   console.log(username,email,password)
        if(!username) throw new BadRequestError("username is required");
        if(!email)    throw new BadRequestError("email is required");
       if(!password) throw new BadRequestError("password is required");

        const user=await User.findOne({email:email});

        if(user)  throw new BadRequestError("email already exists");
        const passwordHash=await hashPassword(password);
        const newUser=await User.create({
            username,
            email,
            password:passwordHash,
        });
      
     const token=generateToken({user:newUser._id});

     res.status(201).cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 604800000),
      })
      .json({ user: newUser,Token:token });
        }catch(err){
            next(err);
        } 
    }

    async login(req, res, next) {
        try{
        const {email,password}=req.body;
        if(!email) throw new BadRequestError("email is required");
        if(!password) throw new BadRequestError("Password is required");

        const existuser=await User.findOne({email});
        if(!existuser) throw new UnauthorizedError("user is not found");
        
        const verify=await comparePassword(password,existuser.password);
        if(!verify) throw new BadRequestError("password is incorrect");
        const token=generateToken({user:existuser._id});

     res.status(201).cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 604800000),
      })
      .json({ user: existuser ,Token:token});
        }catch(err){
            next(err);
        }
        


    }

    async logout(req, res, next) {
        try{
            res.status(200).clearCookie("token").json({msg:"logout successfully"});
        }catch(err){
            next(err);
        }
       
    }
}

module.exports = new AuthController();