const { Profile, studentProfile } = require("../models");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
const filePath = path.join(__dirname, "../assets/profile");

class C_profile {
  static getProfilePage(req, res) {
    res.render("profile", { user: req.session.user });
  }

  static postEditProfile(req, res) {
    // upload file
    // membuat objek form dari formidable
    const form = new formidable.IncomingForm();

    // penanganan upload file
    form.parse(req, (err, fields, files) => {
      const oldpath = files.filetoupload.path;
      const newpath = filePath + "/" + files.filetoupload.name;
      console.log(filePath, ">>>>>>>>");

      // pemindahan file dengan mv
      mv(oldpath, newpath, function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("file uploaded successfully");
        return res.end("file uploaded successfully");
      });
    });
  }
}

module.exports = C_profile;
