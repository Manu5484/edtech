const cloudinary = require("cloudinary").v2;

async function uploadtocloud(file,folder,quality)
{
  const options={
    folder,
    resource_type:"auto"
  }
  if(quality)
  {
    options.quality=quality;
  }
  // console.log("temp file : ",file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}

module.exports=uploadtocloud;