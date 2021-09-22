const express = require("express");
const router = express.Router();
const auth = require("./auth");
const pengajar = require("./pengajar");
const siswa = require("./siswa");
const C_home = require("../controllers/C_home");

router.get("/", C_home.getHome);

const isLoggedIn = (req, res, next) => {
  let session = req.session.user;
  if (session) {
    if (session.role === "pengajar") {
      res.redirect("/pengajar");
    } else {
      res.redirect("/siswa");
    }
  } else {
    next();
  }
};

router.use("/auth", isLoggedIn, auth);

const isPengajar = (req, res, next) => {
  let session = req.session.user;
  if (!session) {
    res.redirect("/?message=Anda harus login terlebih dahulu");
  } else {
    if (session.role !== "pengajar") {
      res.redirect("/siswa");
    } else {
      next();
    }
  }
};

router.use("/pengajar", isPengajar, pengajar);

const isSiswa = (req, res, next) => {
  let session = req.session.user;
  if (!session) {
    res.redirect("/?message=Anda harus login terlebih dahulu");
  } else {
    if (session.role !== "siswa") {
      res.redirect("/pengajar");
    } else {
      next();
    }
  }
};

router.use("/siswa", isSiswa, siswa);

module.exports = router;
