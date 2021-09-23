const express = require("express");
const router = express.Router();
const C_profile = require("../controllers/C_profile");

router.get("/", C_profile.getProfilePage);
router.post("/update", C_profile.postEditProfile);

module.exports = router;
