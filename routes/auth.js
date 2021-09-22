const express = require("express");
const router = express.Router();
const C_auth = require("../controllers/C_auth");

router.get("/", C_auth.getLoginPage);
router.post("/", C_auth.postLoginPage);
router.get("/register", C_auth.getRegisterPage);
router.post("/register", C_auth.postRegisterPage);

module.exports = router;
