const musicModel=require("../models/music.model")
const uploadFile=require("../services/storage.service")
const Jwt=require("jsonwebtoken")

async function createMusic(req,res){

 const token = req.cookies.token;

    console.log("TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    let decoded;

    try{
        decoded=Jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role!=="artist"){
            return res.status(403).json({
                message:"You don't have access to create music"
            })
        }
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
    const {title}=req.body;
    const file=req.file;

    if (!title) {
    return res.status(400).json({
        message: "Title is required"
    });
}

if (!file) {
    return res.status(400).json({
        message: "Music file is required"
    });
}

    const result= await uploadFile(file.buffer.toString('base64'));
    console.log("IMAGEKIT RESULT:", result);

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id,
    })

    res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })
}

module.exports={createMusic}