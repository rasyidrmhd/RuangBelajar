const express = require("express");
const router = express.Router();
const C_siswa = require("../controllers/C_siswa");
const C_profile = require("../controllers/C_profile");

router.get("/", C_siswa.getHomeSiswa);
router.get("/profile", C_profile.getEditProfile);
router.post("/profile", C_profile.postEditProfile);
router.get("/topup", C_siswa.getTopUp);
router.post("/topup", C_siswa.postTopUp);
router.get("/logout", C_siswa.getLogout);
router.get("/add-course", C_siswa.getListCourse);
router.get("/:courseId/add-course", C_siswa.getRentCourse);
router.get("/:courseId/detail-course", C_siswa.getDetailCourse);
router.get("/:courseId/delete-course", C_siswa.getDeleteCourse);

module.exports = router;
