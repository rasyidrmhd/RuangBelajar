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

module.exports = { isLoggedIn, isPengajar, isSiswa };
