const express = require("express");
const router = express.Router();
const C_pengajar = require("../controllers/C_pengajar");
const C_profile = require("../controllers/C_profile");

router.get("/", C_pengajar.getHomePengajar);
router.get("/add-course", C_pengajar.getAddFormCourse);
router.post("/add-course", C_pengajar.postAddFormCourse);
router.get("/:courseId/detailCourse", C_pengajar.getEditFormCourse);
router.post("/:courseId/detailCourse", C_pengajar.postEditFormCourse);
router.get('/delete-course/:courseId', C_pengajar.getDeleteCourse)
router.get("/logout", C_pengajar.getLogout);
router.post("/upload-photo", C_profile.postUploadPhoto);
router.get("/profile", C_profile.getEditProfile);
router.post("/:id/profile", C_profile.postEditProfile);

module.exports = router;
