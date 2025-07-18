const sessionModel = require("../model/sessionModel");
const subsessionModel = require("../model/subsessionModel");
const uploadtocloud = require("../utile/uploadCloudinary");

async function createSubsession(req,res)
{
  try{

    const {title,timeDuration,description,sessionId}=req.body;

    const videoFile=req.files.videoFile;

    if(!title || !timeDuration || !description || !videoFile)
    {
      return res.status(400).json({
        success:false,
        message:"enter all data",
      })
    }

    const response=await uploadtocloud(videoFile,"sample");

    const subsession=await subsessionModel.create({title,timeDuration,description,videoUrl:response.secure_url});

    const updatedsession=await sessionModel.findByIdAndUpdate({_id:sessionId},{$push:{subsession:subsession._id}},{new:true}).populate("subsession").exec();

    res.status(200).json({
      success:true,
      message:"subsession created successfully",
      updatedsession
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create subsession",
      error:error.message
    })
  }
}

async function updateSubsession(req,res)
{
  try{

    const {title,timeDuration,description,subsessionId}=req.body;
    const videoFile=req.files.videoFile;

    if(!title || !timeDuration || !description || !videoFile)
    {
      return res.status(400).json({
        success:false,
        message:"enter all data",
      })
    }

    const response=await uploadtocloud(videoFile,"sample");

    const updatedSubsession=await subsessionModel.findByIdAndUpdate({subsessionId},{title,timeDuration,description,videoUrl:response.secure_url});

    res.status(200).json({
      success:false,
      message:" updated subsession",
      updatedSubsession
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

async function deleteSubsession(req,res)
{
  try{

    const {subsessionId}=req.body;

    if(!subsessionId)
    {
      return res.status(400).json({
        success:false,
        message:"no subsession id",
      })
    }

    await subsessionModel.findByIdAndDelete(subsessionId);

    res.status(200).json({
      success:true,
      message:"subsession deleted successfully",
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to delete session",
      error:error.message
    })
  }
}

module.exports={
  createSubsession,
  updateSubsession,
  deleteSubsession
}