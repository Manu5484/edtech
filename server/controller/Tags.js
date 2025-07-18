const courseModel = require("../model/courseModel");
const tagsModel = require("../model/tagsModel");

async function createTags(req,res)
{
  try{

    const {name,description}=req.body;

    if(!name || !description)
    {
      return  res.status(400).json({
        success:false,
        message:"missing data",
      }) 
    }

    const existingtag=await tagsModel.findOne({name});
    if(existingtag)
    {
      return  res.status(400).json({
        success:false,
        message:"tag already exist",
      }) 
    }

    const tagdata=await tagsModel.create({name,description});

    res.status(200).json({
      success:true,
      message:"tag added successfuly",
      tagdata
    }) 

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create tags",
      error:error.message
    }) 
  }
}

async function displayAllTags(req,res)
{
  try{

    const alltagdata=await tagsModel.find();

    if(!alltagdata)
    {
      return  res.status(400).json({
        success:false,
        message:"no data present",
      })  
    }

    res.status(200).json({
      success:true,
      message:"tags displayed",
      alltagdata
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create tags",
      error:error.message
    })
  }
}

async function tagBasedCourse(req,res)
{
  try{

    const {tagId}=req.body;

    const coursedetails=await courseModel.findOne({tags:tagId},{name:true,thumbnailUrl:true,
    price:true,description:true})

    res.status(200).json({
      success:true,
      message:"course based on tags",
      coursedetails
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to fetch course",
      error:error.message
    })
  }
}

module.exports={
  createTags,
  displayAllTags,
  tagBasedCourse
}