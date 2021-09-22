const express = require("express");
const router = express.Router();
const C_siswa = require("../controllers/C_siswa");

router.get("/", C_siswa.getHomeSiswa);

module.exports = router;
