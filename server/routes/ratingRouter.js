const express=require("express");
const { auth } = require("../middleware/auth");
const { createRatingReview, getAllRating, avgrating } = require("../controller/ratingReview");
const router=express.Router();

router.post("/createrating",auth,createRatingReview);
router.get("/allrating",getAllRating);
router.get("/avgrating",avgrating);

module.exports=router;