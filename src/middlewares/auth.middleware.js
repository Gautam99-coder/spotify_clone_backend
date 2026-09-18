const Jwt=require("jsonwebtoken");

async function authArtist(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded=Jwt.verify(token,process.env.JWT_SECRET); 
        
        if(decoded.role!=="artist"){
            return res.status(403).json({message:"you don't have access"})
        }

        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized"})
    }
}


async function authUser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthrozied"})
    }
    try{
    const decoded=Jwt.verify(token,process.env.JWT_SECRET);

    if(decoded.role!=="user"){
        return res.status(403).json({message:"you can't access"})
    }
    req.user=decoded;
    next();
    }catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthrozied"});
    }
}


module.exports={authArtist,authUser};