const musicModel=require("../models/music.model")
const uploadFile=require("../services/storage.service")
const albumModel=require("../models/album.model")

async function createMusic(req,res){   
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
        artist:req.user.id,
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


async function createAlbum(req, res) {
    const { title, musics } = req.body;

    try {
        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create album",
            error: err.message
        });
    }
}


async function getAllMusics(req,res){
    const musics=await musicModel.find()
    .skip(4)
    .limit(1)
    .populate("artist","username email")

    res.status(200).json({
        message:"musices fetched successfully",
        musics:musics,
    })
}

async function getAlbum(req,res){
    const albums=await albumModel.find().select("title artist").populate("artist","username email")

    res.status(200).json({
        message:"albums fetched successfully",
        albums:albums,
    })
}

async function getAlbumById(req,res){
    const albumId=req.params.albumId;
    const album=await albumModel.findById(albumId).populate("artist" ,"username email").populate("musics");
    return res.status(200).json({
        message:"album fetched successfully",
        album:album,
    })
}

module.exports={createMusic,createAlbum,getAllMusics,getAlbum,getAlbumById}