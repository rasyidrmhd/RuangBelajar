const { User, Profile } = require("../models");

class C_pengajar {
  static getHomePengajar(req, res) {
    res.render("pengajar");
  }
}

module.exports = C_pengajar;
