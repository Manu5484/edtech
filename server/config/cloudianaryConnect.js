const cloudinary=require("cloudinary").v2

require("dotenv").config();

function cloudinaryConnect(){
  try{
    cloudinary.config({
      cloud_name:process.env.CLOUD_NAME,
      api_key:process.env.CLOUD_API,
      api_secret:process.env.CLOUD_SECUR_KEY
    })
  }catch(error)
  {
    console.log("error whle connecting cloudinary ", error.message);
  }
}

module.exports=cloudinaryConnect; 