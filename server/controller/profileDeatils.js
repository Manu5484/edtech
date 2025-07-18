const profileModel = require("../model/profileModel");
const userModel = require("../model/userModel");

async function updateProfileDetails(req,res)
{
  try{

    const {id}=req.user;
    const {gender,dob,mobile,about}=req.body;

    if(!id)
    {
      return res.status(400).json({
        success:false,
        message:"id not present",
      })
    }

    const userDetails=await userModel.findById(id);
    const profileId=await userDetails.profiledata;

    const updatedProfileDetails=await profileModel.findByIdAndUpdate({profileId},{gender,dob,mobile,about},{new:true});

    res.status(200).json({
      success:true,
      message:"updated profile details",
      updatedProfileDetails
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create session",
      error:error.message
    })
  }
}

async function allUserdata(req,res)
{
  try{

    const {id}=req.user;

    const userdetails=await userModel.findById(id).populate("profiledata");

    res.status(200).json({
      success:true,
      message:"user data",
      userdetails
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:"unabel to fetch user data",
      error:error.message
    })
  }
}

async function deleteAccount(req,res)
{
  try{

    const {id}=req.user;

    const user=await userModel.findById(id);

    if(!user)
    {
      return res.status(400).json({
        success:false,
        message:"user not present",
      })
    }

    await profileModel.findByIdAndDelete(user.profiledata);

    await userModel.findByIdAndDelete(user._id);

    res.status(200).json({
      success:true,
      message:"account deleted successfully",
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to fetch user data",
      error:error.message
    })
  }
}

module.exports={
  updateProfileDetails,
  allUserdata,
  deleteAccount
}