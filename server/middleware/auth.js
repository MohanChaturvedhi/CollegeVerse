const {UnauthorizedError}=require('./error');
const {verifyToken}=require('../utils/jwt');


const requireAuth=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        
        if(!token){
            throw new UnauthorizedError("Unauthorized");
        }
        const payload =verifyToken(token);
        req.user=payload;
        next();
    }catch(error){
        res.status(401).json({msg:"Unauthorized"})
    }
     
}

module.exports={requireAuth};