const otpgenerator=require("otp-generator");
const userModel = require("../model/userModel");
const otpModel = require("../model/otpModel");
const profileModel = require("../model/profileModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

async function generateotp(req,res)
{
  try{
    const {email}=req.body;
  if(!email)
  {
    return res.status(400).json({
      success:false,
      message:"email not found"
    }) 
  }

  const existinguser=await userModel.findOne({email});
  if(existinguser)
  {
    return res.status(400).json({
      success:false,
      message:"user alredy exixst"
    }) 
  }

  const otp=otpgenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
  })

  const savedotp=await otpModel.create({email,otp});

  console.log(savedotp);
  res.status(200).json({
    success:true,
    message:'otp sent successfully',
    savedotp
  })

  }
  catch(error)
  {
    console.log(error.message);
  }
  
}

async function signup(req,res)
{
  try{

    const {firstname,lastname,email,password,conformpassword,accounttype,otp}=req.body;

    if(!firstname || !lastname || !email || !password ||!conformpassword|| !otp)
    {
      return res.status(400).json({
        success:false,
        message:"please enter all data",
      }) 
    }

    const existinguser=await userModel.findOne({email});
    if(existinguser)
    {
      return res.status(400).json({
        success:false,
        message:"user alredy exixst"
      }) 
    }

    if(password!==conformpassword)
    {
      return res.status(400).json({
        success:false,
        message:"password doest match"
      }) 
    }

    let recentotp=await otpModel.findOne({email}).sort({createdAt:-1}).limit(1);
    // console.log("recent otp : ",recentotp);
    if(!recentotp)
    {
      return res.status(400).json({
        success:false,
        message:"error while getting otp"
      }) 
    }
    if(otp!==recentotp.otp)
    {
      return res.status(400).json({
        success:false,
        message:"invalid otp"
      }) 
    }

    const hashedpassword=await bcrypt.hash(password,10);

    const profiledetails=await profileModel.create({
      gender:null,
      dob:null,
      mobile:null,
      about:null,
    })


    const user=await userModel.create({
      firstname,
      lastname,
      email,
      password:hashedpassword,
      accounttype,
      profiledata:profiledetails._id,
      userimage:`https://ui-avatars.com/api/?name=${firstname} ${lastname}&background=random&color=fff&size=256`
    })

    res.status(200).json({
      success:true,
      message:"signup successfull",
      user
    })

  }catch(error)
  {
    console.log(error);
    res.status(400).json({
      success:false,
      message:"unabel to signup",
      error:error
    }) 
  }
}

async function login(req,res)
{
  try{

    const {email,password}=req.body;

    if(!email || !password)
    {
      return res.status(400).json({
        success:false,
        message:"fill all the details",
      }) 
    }

    const user=await userModel.findOne({email});

    if(!user)
    {
      return res.status(400).json({
        success:false,
        message:"user not exist , please signup",
      }) 
    }

    const playload={
      id:user._id,
      email:user.email,
      accounttype:user.accounttype,
      
    }

    if(await bcrypt.compare(password, user.password))
    {
      const token= jwt.sign(playload,process.env.JWT_KEY,{expiresIn: 10*60});
      user.token=token;
      user.password=undefined;
      let options={ 
        expires:new Date(Date.now()+10*60*1000),
        secure: false, 
        httpOnly:true,
      }
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"logined successfulky"
      })
    }else{
      return res.status(401).json({
        success:false,
        message:"invalid password",
      }) 
    }
  }catch(error){
    res.status(400).json({
      success:false,
      message:"unabel to login",
      error:error.message
    }) 
  }
}

module.exports={
  generateotp,
  signup,
  login
}