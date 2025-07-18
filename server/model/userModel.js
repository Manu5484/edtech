const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
    trim:true
  },
  lastname:{
    type:String,
    trim:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  accounttype:{
    type:String,
    enum:["admin","student","educator"],
    default:"student"
  },
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"coursesModel"
  }],
  courseprogress:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courseprogressModel"
  }],
  profiledata:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"profileModel"
  },
  passwordtoken:{
    type:String,
  },
  passwordexpire:{
    type:Date
  },
  userimage:{
    type:String,
  }
  
})

module.exports=mongoose.model("userModel",userSchema);