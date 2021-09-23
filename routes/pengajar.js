const express = require("express");
const router = express.Router();
const C_pengajar = require("../controllers/C_pengajar");
const C_profile = require("../controllers/C_profile");

router.get("/", C_pengajar.getHomePengajar);
router.get("/profile");
router.get("/add-course", C_pengajar.getAddFormCourse);
router.post("/add-course", C_pengajar.postAddFormCourse);
router.get("/logout", C_pengajar.getLogout);

module.exports = router;
