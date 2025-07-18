const express=require("express");
const { createCourse, viewAllCourse, viewCourseDetails } = require("../controller/courses");
const { createsession, updateSession, deleteSession } = require("../controller/session");
const { createSubsession, updateSubsession, deleteSubsession } = require("../controller/subsession");
const { auth, isEducator } = require("../middleware/auth");
const router=express.Router();

router.post("/createcourse",auth,isEducator,createCourse);
router.get("/viewallcourse",viewAllCourse);
router.get("/particularcourse",viewCourseDetails);

router.post("/createsession",auth,isEducator,createsession);
router.put("/updatesession",auth,isEducator,updateSession);
router.delete("/deletesession",auth,isEducator,deleteSession);

router.post("/createsubsession",auth,isEducator,createSubsession);
router.put("/updatedsubsession",auth,isEducator,updateSubsession);
router.delete("/deleteSubsession",auth,isEducator,deleteSubsession);

module.exports=router;