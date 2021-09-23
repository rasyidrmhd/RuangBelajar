const { Teacher, Profile, Course } = require("../models");
const { dateFormatter, timeFormatter } = require("../helpers/dateFormatter");

class C_pengajar {
  static getHomePengajar(req, res) {
    Course.findAll({
      where: {
        TeacherId: req.session.user.id,
      },
    })
      .then((dataCourses) => {
        res.render("pengajar", { dataCourses, dateFormatter, timeFormatter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getAddFormCourse(req, res) {
    console.log(req.session.user.id);
    res.render("pengajar/addFormCourse");
  }

  static postAddFormCourse(req, res) {
    const { name, description, duration, price } = req.body;

    Course.create({
      name,
      description,
      duration,
      price,
      TeacherId: req.session.user.id,
    })
      .then((added) => {
        res.redirect("/pengajar");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
}

module.exports = C_pengajar;
