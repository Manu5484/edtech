const courseModel = require("../model/courseModel");
const sessionModel = require("../model/sessionModel");

async function createsession(req,res)
{
  try{

    const {name,courseId}=req.body;

    if(!name || !courseId)
    {
      return res.status(400).json({
        success:false,
        message:"enter all data",
      })
    }

    const sessionDetails=await sessionModel.create({name});

    const coursedetails=await courseModel.findByIdAndUpdate({_id:courseId},{$push:{courseContent:sessionDetails._id}},{new:true}).populate("courseContent").exec();

    res.status(200).json({
      success:true,
      message:"session created successfully",
      coursedetails
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

async function updateSession(req,res)
{
  try{

    const {name,sessionId}=req.body;

    if(!name)
    {
      return res.status(400).json({
        success:false,
        message:"enter all data",
      })
    }

    const updatedsession=await sessionModel.findByIdAndUpdate({_id:sessionId},{name:name},{new:true});

    res.status(200).json({
      success:true,
      message:"updated successfuly",
      updatedsession
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to update session",
      error:error.message
    })
  }
}

async function deleteSession(req,res)
{
  try{

    const {sessionId}=req.params;

    if(!sessionId)
    {
      return res.status(400).json({
        success:false,
        message:"no session id",
      })
    }

    //TODO: do we need to delete the session id stored in course

    await sessionModel.findByIdAndDelete({_id:sessionId});

    res.status(200).json({
      success:true,
      message:" session deleted",
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

module.exports={
  createsession,
  updateSession,
  deleteSession
}