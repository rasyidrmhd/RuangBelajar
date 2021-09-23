const { Profile, studentProfile, Teacher, Student } = require("../models");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
const filePath = path.join(__dirname, "../assets/profile");

class C_profile {
  static getEditProfile(req, res) {
    let query;

    console.log(req.session.user.role);
    if (req.session.user.role === "pengajar") {
      query = Teacher.findOne({ where: { id: req.session.user.id }, include: Profile });
    } else {
      query = Student.findOne({ where: { id: req.session.user.id }, include: studentProfile });
    }

    query
      .then((data) => {
        res.render("profile", { data, user: req.session.user, message: req.query.message });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postEditProfile(req, res) {
    const { fullName, address, phone } = req.body;
    let option = { fullName, address, phone };
    let query;

    if (req.session.user.role === "pengajar") {
      query = Profile.update(option, { where: { TeacherId: req.session.user.id } });
    } else {
      query = studentProfile.update(option, { where: { StudentId: req.session.user.id } });
    }

    query
      .then((updated) => {
        req.session.user.fullName = fullName;
        if (req.session.user.role === "pengajar") {
          res.redirect("/pengajar/profile?message=sukses");
        } else {
          res.redirect("/siswa/profile?message=sukses");
        }
      })
      .catch((err) => {
        if (req.session.user.role === "pengajar") {
          res.redirect("/pengajar/profile?message=gagal");
        } else {
          res.redirect("/siswa/profile?message=gagal");
        }
      });
  }

  static postUploadPhoto(req, res) {
    // membuat objek form dari formidable
    const form = new formidable.IncomingForm();
    // penanganan upload file
    form.parse(req, (err, fields, files) => {
      if (files.filetoupload.name) {
        const oldpath = files.filetoupload.path;
        let format = files.filetoupload.name.split(".");
        format = format[format.length - 1];
        let filename = `${req.session.user.role}_${req.session.user.id}_profile.${format}`;
        const newpath = filePath + "/" + filename;

        // pemindahan file dengan mv
        mv(oldpath, newpath, (err) => {
          if (err) {
            if (req.session.user.role === "pengajar") {
              res.redirect("/pengajar/profile?message=gagal");
            } else {
              res.redirect("/siswa/profile?message=gagal");
            }
          } else {
            if (req.session.user.role === "pengajar") {
              Profile.update({ photo: filename }, { where: { TeacherId: req.session.user.id } })
                .then((updated) => {
                  req.session.user.photo = filename;
                  res.redirect("/pengajar/profile?message=sukses");
                })
                .catch((err) => {
                  res.redirect("/pengajar/profile?message=gagal");
                });
            } else {
              studentProfile
                .update({ photo: filename }, { where: { StudentId: req.session.user.id } })
                .then((updated) => {
                  req.session.user.photo = filename;
                  res.redirect("/siswa/profile?message=sukses");
                })
                .catch((err) => {
                  console.log(err);
                  res.redirect("/siswa/profile?message=gagal");
                });
            }
          }
        });
      } else {
        if (req.session.user.role === "pengajar") {
          res.redirect("/pengajar/profile?message=gagal");
        } else {
          res.redirect("/siswa/profile?message=gagal");
        }
      }
    });
  }
}

module.exports = C_profile;
