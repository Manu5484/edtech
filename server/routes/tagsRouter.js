const express=require("express");
const { auth, isAdmin } = require("../middleware/auth");
const { createTags, displayAllTags, tagBasedCourse } = require("../controller/Tags");
const router=express.Router();

router.post("/createtags",auth,isAdmin,createTags);
router.get("/alltags",displayAllTags);
router.get("/tagpage",tagBasedCourse);

module.exports=router;