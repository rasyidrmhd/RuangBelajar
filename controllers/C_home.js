class C_home {
  static getHome(req, res) {
    res.redirect("/auth");
  }
}

module.exports = C_home;
