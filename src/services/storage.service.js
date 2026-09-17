const imageKit=require("@imagekit/nodejs")


const imageKitClient=new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file){
    const result= await imageKitClient.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"yt_complete_backend/music"
    })

    return result;
}

module.exports=uploadFile;