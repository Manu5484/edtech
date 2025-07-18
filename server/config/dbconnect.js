const mongoose=require("mongoose");
require("dotenv").config;


function connectdb()
{
  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log("database connect successfully");
  })
  .catch(()=>{
    console.log("error while connecting database")
  })
}

module.exports=connectdb;