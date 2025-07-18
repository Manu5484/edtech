const mongoose = require("mongoose");
const courseModel = require("../model/courseModel");
const userModel=require("../model/userModel");
const mailSender=require("../utile/mailSender")
const instance = require("../config/razorpayConnect");

async function capturePayment(req,res)
{
  try{

    const {courseId}=req.body;
    const {id}=req.user;

    if(!courseId)
    {
      return res.status(400).json({
        success:false,
        message:"unabel to fetch course",
      })
    }

    const courseDetails=await courseModel.findById({_id:id});
    if(!courseDetails)
    {
      return res.status(400).json({
        success:false,
        message:"unabel find course",
      })
    }


    const userObjectId=mongoose.Schema.Types.ObjectId(id);

    if(courseDetails.studentsenrolled.includes(userObjectId))
    {
      return res.status(400).json({
        success:false,
        message:"user already enrolled",
      })
    }

    const amount=courseDetails.price;
    const currency="INR";

    const options={
      amount:amount*100,
      currency,
      receipt:Math.random(Date.now()).toString(),
      notes:{
        courseId,
        userId:id
      }
    }
    try{

      const paymentResponse=await instance.orders.create(options);

      return  res.status(200).json({
        success:true,
        message:"successfull payment order",
        coursename:courseDetails.name,
        userObjectId,
        orderId:paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount
      })

    }catch(error)
    {
      res.status(500).json({
        success:false,
        message:"unsuccessfull payment order",
        error:error.message
      })
    }

  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unsuccessfull payment ",
      error:error.message
    })
  }
}

async function verifySignature(req,res)
{
  try{

    const securitykey=process.env.RAZORPAY_KEY_SECRET;

    const signature=req.headers["x-razorpay-signature"];

    if(!signature)
    {
      return res.status(400).json({
        success:false,
        message:"no signature found",
      })
    }

    const generatedSignature = crypto
      .createHmac('sha256', securitykey)
      .update(JSON.stringify(req.body)) // raw body
      .digest('hex');

    if(signature===generatedSignature)
    {
      console.log('Webhook signature verified:', req.body.toString());

      const {courseId,userId}=req.body.payload.payment.entity.notes;

      try{

        const updatedCourse=await courseModel.findByIdAndUpdate({courseId},{$push:{studentsenrolled:userId}},{new:true});

        const updatedUser=await userModel.findByIdAndUpdate({userId},{$push:{courses:courseId}},{new:true});

        const mailresponse=await mailSender(updatedUser.email,"course purchase conformation",`${updatedUser.firstname} have successfully enrolled to new crouse - ${updatedCourse.name}`);

        res.status(200).json({
          success:true,
          message:"course purchased successffully",
          updatedCourse,
          updatedUser,
          mailresponse
        })

      }catch(error)
      {
        res.status(500).json({
          success:false,
          message:"unable add to course or user ",
          error:error.message
        })
      }
    }
    else{
      return res.status(500).json({
        success:false,
        message:"cannot verify signature ",
      })
    }


  }catch(error)
  {
    res.status(500).json({
      success:false,
      message:"unsuccessfull payment ",
      error:error.message
    })
  }
}

module.exports={
  capturePayment,
  verifySignature
}