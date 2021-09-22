const { User, Profile } = require("../models");

class C_siswa {
  static getHomeSiswa(req, res) {
    res.render("siswa");
  }
}

module.exports = C_siswa;
