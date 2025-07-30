const express=require("express");
const connectdb = require("./config/dbconnect");
const cloudinaryConnect = require("./config/cloudianaryConnect");
const fileUpload=require("express-fileupload");
const cors=require("cors");
const routeruser = require("./routes/userRouter");
const routertag = require("./routes/tagsRouter");
const routercourse = require("./routes/courseRouter");
const routerrate = require("./routes/ratingRouter");
// const routerpay = require("./routes/paymentsRouter");
const cookieParser = require("cookie-parser");



const app=express();

require("dotenv").config;

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}));
app.use("/api",routeruser);
app.use("/api",routertag);
app.use("/api",routercourse);
app.use("/api",routerrate);
// app.use("/api",routerpay);



connectdb();
cloudinaryConnect();

app.listen(process.env.PORT,()=>{
  console.log("app started successfullt");
})

app.get("/",(req,res)=>{
  res.send("this is home page of megaproject");
})