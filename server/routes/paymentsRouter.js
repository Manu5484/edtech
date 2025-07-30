const express=require("express");
const { auth, isStudent } = require("../middleware/auth");
const { capturePayment, verifySignature } = require("../controller/payments");
const router=express.Router();

router.post("/capturepayments",auth,isStudent,capturePayment);
router.post("/verifypayment",auth,isStudent,verifySignature);

module.exports=router;