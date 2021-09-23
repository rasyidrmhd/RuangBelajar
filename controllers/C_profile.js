const { Profile, studentProfile, Teacher, Student } = require("../models");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
const filePath = path.join(__dirname, "../assets/profile");

class C_profile {
  static getEditProfile(req, res) {
    let query;
    if (req.session.user.role === "Pengajar") {
      query = Teacher.findOne({ where: { id: req.session.user.id }, include: Profile });
    } else {
      query = Student.findOne({ where: { id: req.session.user.id }, include: studentProfile });
    }

    query
      .then((user) => {
        res.render("profile", { user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postEditProfile(req, res) {
    const { fullName, address, phone } = req.body;
    console.log(fullName, address, phone, "?>>>>>>>>>>>>>");
    let option = { fullName, address, phone };
    let query;

    if (req.session.user.role === "Pengajar") {
      query = Profile.update(option, { where: { TeacherId: req.session.user.id } });
    } else {
      query = studentProfile.update(option, { where: { StudentId: req.session.user.id } });
    }

    query
      .then((updated) => {
        res.redirect("/siswa");
      })
      .catch((err) => {
        res.send(err);
      });

    // membuat objek form dari formidable
    // const form = new formidable.IncomingForm();
    // // penanganan upload file
    // form.parse(req, (err, fields, files) => {
    //   const oldpath = files.filetoupload.path;
    //   const newpath = filePath + "/" + files.filetoupload.name;

    //   // pemindahan file dengan mv
    //   mv(oldpath, newpath, function (err) {
    //     if (err) {
    //       console.log(err);
    //       throw err;
    //     }

    //     console.log("file uploaded successfully");
    //     return res.redirect("/siswa");
    //   });
    // });
  }
}

module.exports = C_profile;
