const express = require("express");
const router = express.Router();
const C_pengajar = require("../controllers/C_pengajar");

router.get("/", C_pengajar.getHomePengajar);

module.exports = router;
