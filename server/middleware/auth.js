const jwt=require("jsonwebtoken");
const userModel = require("../model/userModel");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token in header:", token);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};


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