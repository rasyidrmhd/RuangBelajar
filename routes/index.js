const express = require("express");
const router = express.Router();
const auth = require("./auth");
const pengajar = require("./pengajar");
const siswa = require("./siswa");
const { isLoggedIn, isPengajar, isSiswa } = require("../middleware/session");
const C_home = require("../controllers/C_home");

router.get("/", C_home.getHome);

router.use("/auth", isLoggedIn, auth);
router.use("/pengajar", isPengajar, pengajar);
router.use("/siswa", isSiswa, siswa);

module.exports = router;
