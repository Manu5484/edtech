const ratingreviewModel = require("../model/ratingreviewModel");
const userModel = require("../model/userModel");
const courseModel=require("../model/courseModel");
const mongoose=require("mongoose");

async function createRatingReview(req,res)
{
  try{

    const {id}=req.user;
    const {cousreId,rating,review}=req.body;

    if(!cousreId || !rating || !review)
    {
      return  res.status(400).json({
        success:false,
        message:"enter all data",
      }) 
    }

    const userDetails=await userModel.findOne({_id:id});
    const coursedetails=await courseModel.findOne({id:cousreId,studentsenrolled:{$elemMatch:{$eq: id}}});

    if(!coursedetails)
    {
      return  res.status(400).json({
        success:false,
        message:"user not enrolled to course to review",
      }) 
    }

    const alreadyreviewed=await ratingreviewModel.findOne({user:userDetails._id,course:cousreId});

    if(alreadyreviewed)
    {
      return  res.status(400).json({
        success:false,
        message:"you can review only once",
      }) 
    }

    const ratingAndReviews=await ratingreviewModel.create({user:userDetails._id,course:cousreId,rating,review});

    const updatedCourseDetails=await courseModel.findByIdAndUpdate({_id:cousreId},{$push:{ratingAndReviews:ratingAndReviews._id}},{new:true});

    res.status(200).json({
      success:true,
      message:"review added successfully",
      ratingAndReviews,
      updatedCourseDetails
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to create rating and review",
      error:error.message
    })
  }
}

async function avgrating(req,res)
{
  try{

    const {courseId}=req.body;

    const avgRating =await ratingreviewModel.aggregate([
                      {
                        $match:{ course:mongoose.Types.ObjectId(courseId)},
                      },
                      {
                        $group:{
                          _id:null,
                          averageRating:{$avg:'$rating'}
                        },
                      }
                    ]);
    
    if(avgRating.length>0)
    {
      return res.status(200).json({
        success:true,
        averageRating:avgRating[0].averageRating.toFixed(2),
      })
    }
    else{
      return res.status(200).json({
        success:true,
        averageRating:0,
      })
    }

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to crefetchate rating and review",
      error:error.message
    })
  }
}

async function getAllRating(req,res)
{
  try{

    const allratingdetails=await ratingreviewModel.find().sort({rating:"desc"})
                                                .populate({
                                                  path:"user",
                                                  select:"firstname lastname userimage"
                                                }).populate({
                                                  path:"course",
                                                  select:"name"
                                                }).exec();
                                              
    res.status(200).json({
      success:true,
      allratingdetails
    })

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unabel to crefetchate rating and review",
      error:error.message
    })
  }
}

module.exports={
  createRatingReview,
  avgrating,
  getAllRating
}