class C_home {
  static getHome(req, res) {
    res.render("home", { message: req.query.message });
  }
}

module.exports = C_home;
