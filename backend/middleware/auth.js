const jwt = require ("jsonwebtoken")

const authMiddleware = async (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorize Login Again"})
    }
    try{
        const token_docode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_docode.id;
        next();
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

module.exports = authMiddleware;