const express=require("express")
const musicController=require("../controllers/music.controller")
const authMiddleWare=require("../middlewares/auth.middleware")
const multer=require("multer")


const upload=multer({
    storage:multer.memoryStorage(),
})
const router=express.Router();

router.post("/create-music",authMiddleWare.authArtist,upload.single("music"), musicController.createMusic);

router.post("/create-album",authMiddleWare.authArtist,musicController.createAlbum);
router.get("/musics",authMiddleWare.authUser,musicController.getAllMusics)
router.get("/album",musicController.getAlbum);
router.get("/album/:albumId",musicController.getAlbumById);

module.exports=router;