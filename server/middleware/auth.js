const jwt=require("jsonwebtoken");
const userModel = require("../model/userModel");
require("dotenv").config();

async function auth(req,res,next)
{
  try{

    const {token}=req.cookies;

    console.log("token at auth middleware : ",token);

    if(!token)
    {
      return res.status(400).json({
        success:false,
        message:"invalid token",
        
      }) 
    }

    const decode=jwt.verify(token,process.env.JWT_KEY);
    req.user=decode;
    console.log(decode);
    next();

  }catch(error)
  {
    return res.status(400).json({
      success:false,
      message:"unabel to signup",
      error:error.message
    }) 
  }
}

function isStudent(req,res,next)
{
  try{
    if(req.user.accounttype!=="student")
    {
      res.status(400).json({
        success:false,
        message:"thiz is protected , not allowed"
      })
    }
    next();
  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
  
}

function isEducator(req,res,next)
{
  try{
    if(req.user.accounttype!=="educator")
    {
      res.status(400).json({
        success:false,
        message:"thiz is protected , not allowed"
      })
    }
    next();
  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
  
}

function isAdmin(req,res,next)
{
  try{
    if(req.user.accounttype!=="admin")
    {
      res.status(400).json({
        success:false,
        message:"thiz is protected , not allowed"
      })
    }
    next();
  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
  
}

module.exports={
  auth,
  isStudent,
  isAdmin,
  isEducator
}