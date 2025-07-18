const nodemailer=require("nodemailer");
require("dotenv").config();

async function mailSender(email,title,body){
  try{

    const transpoter=nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      }
    });

    let info=await transpoter.sendMail({
      from:'"manoj ks" <manojks2402@gmail.com>',
      to:`${email}`,
      subject:`${title}`,
      html:`${body}`
    })
    // console.log("info ",info);

  }catch(error)
  {
    console.log(error.message);
  }
}

module.exports=mailSender;