const courseModel = require("../model/courseModel");
const tagsModel = require("../model/tagsModel");
const userModel = require("../model/userModel");
const uploadtocloud=require("../utile/uploadCloudinary");

async function createCourse(req,res)
{
  try{

    const {name,description,whatYouWillLearn,price,tags}=req.body;

    const thumbnail=req.files.thumbnailImage;

    if(!name || !description || !whatYouWillLearn || !price || !tags)
    {
      return  res.status(400).json({
        success:false,
        message:"no full data",
      }) 
    }

    const userId=req.user.id;
    const educatordetails=await userModel.findById({_id:userId});
    if(!educatordetails){
      return  res.status(400).json({
        success:false,
        message:"no educator",
      }) 
    }

    const tagdetails=await tagsModel.findOne({name:tags});
    if(!tagdetails)
    {
      return  res.status(400).json({
        success:false,
        message:"no tag exist",
      }) 
    }

    const uploadedThumbnail=await uploadtocloud(thumbnail,"sample");

    const course=await courseModel.create({
      name,description,
      educator:educatordetails._id,
      whatYouWillLearn,price,tags:tagdetails._id,
      thumbnailUrl:uploadedThumbnail.secure_url
    })

    const updatedUserDetails=await userModel.findByIdAndUpdate({_id:educatordetails._id},{$push:{courses:course._id}},{new:true});

    const updatedTags=await tagsModel.findByIdAndUpdate({_id:tagdetails._id},{$push:{course:course._id}},{new:true});

    res.status(200).json({
      success:true,
      message:"course created successfully",
      course,
      updatedUserDetails,
      updatedTags
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create course",
      error:error.message
    })
  }
}

async function viewAllCourse(req,res)
{
  try{

    const allCourse=await courseModel.find({},{name:true,description:true,educator:true,whatYouWillLearn:true,price:true,courseContent:true});

    if(!allCourse)
    {
      return res.status(400).json({
        success:false,
        message:"unabel to fetch course",
      })
    }

    res.status(200).json({
      success:true,
      message:"all course",
      allCourse
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to  fetch course ",
      error:error.message
    })
  }
}

async function viewCourseDetails(req,res)
{
  try{

    const { courseId } = req.query;

    const courseDetails=await courseModel.findById({_id:courseId}).populate({
                                                      path:"educator",
                                                      populate:{
                                                        path:"profiledata"
                                                      }
                                                  }).populate({
                                                    path:"courseContent",
                                                    populate:{
                                                      path:"subsession"
                                                    }
                                                  }).populate({
                                                    path:"ratingAndReviews",
                                                    populate:{
                                                      path:"user"
                                                    }
                                                  }).populate("tags")
            
    res.status(200).json({
      success:true,
      message:"complete course details",
      courseDetails
    })
                            

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to  fetch course ",
      error:error.message
    })
  }
}

module.exports={
  createCourse,
  viewAllCourse,
  viewCourseDetails
}