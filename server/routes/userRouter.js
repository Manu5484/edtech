const express=require("express");
const { signup, generateotp, login } = require("../controller/Autho");
const { auth } = require("../middleware/auth");
const { updateProfileDetails, deleteAccount, allUserdata } = require("../controller/profileDeatils");
const { passwordtoken, resetpassword } = require("../controller/forgotpass");
const router=express.Router();

router.post("/signup",signup);
router.post("/getotp",generateotp);
router.post("/login",login);

router.put("/updateprofile",auth,updateProfileDetails);
router.delete("/deleteaccount",auth,deleteAccount);
router.get("/alluserdata",allUserdata);

router.put("/generatepasswordtoken",passwordtoken);
router.put("/updatepassword",resetpassword);

module.exports=router;