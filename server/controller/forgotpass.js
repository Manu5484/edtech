const userModel = require("../model/userModel");
const mailSender = require("../utile/mailSender");
const crypto=require("crypto");
const bcrypt=require("bcrypt");

async function passwordtoken(req,res)
{
  try{
    const {email}=req.body;

  existinguser=await userModel.findOne({email});
  if(!existinguser)
  {
    return res.status(400).json({
      success:false,
      message:"no user found",
    }) 
  }

  const token = crypto.randomUUID();


  const updateduser=await userModel.findOneAndUpdate({email},{passwordtoken:token,passwordexpire:Date.now()+5*60*1000},{new:true});

  const url=`http://localhost:3000/update-password/${token}`;

  const response=await mailSender(email,"link to password change",url);

  res.status(200).json({
    success:true,
    message:"link sent to mail successfully ",
    response
  })
  }catch(error)
  {
     res.status(400).json({
      success:false,
      message:"unabel to token",
      error:error.message
    }) 
  }
}

async function resetpassword(req,res)
{
  try{
    const {password,conformpassword,token}=req.body;
    const user=userModel.findOne({passwordtoken:token});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"no user",
      }) 
    }
    if(user.passwordexpire < Date.now())
    {
      return res.status(400).json({
        success:false,
        message:"link expired",
      }) 
    }
    if(password!==conformpassword)
    {
      return res.status(400).json({
        success:false,
        message:"no user",
      }) 
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const updateduser=await userModel.findOneAndUpdate({passwordtoken:token},{password:hashedpassword});
    res.status(200).json({
      success:true,
      message:"password updated successfully",
      updateduser
    })
  }catch(error)
  {
    res.status(400).json({
      success:false,
      message:"error whilechaing password",
      error:error.message
    }) 
  }
}

module.exports={
  passwordtoken,
  resetpassword
}