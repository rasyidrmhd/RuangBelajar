const { Teacher, Student, Profile, studentProfile } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

class C_auth {
  static getLoginPage(req, res) {
    res.render("auth/login", { message: req.query.message });
  }

  static postLoginPage(req, res) {
    const { username, password } = req.body;

    Teacher.findOne({ where: { [Op.or]: [{ username: username }, { email: username }] }, include: [Profile] })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            req.session.user = { id: user.id, role: user.role, fullName: user.Profile.fullName, photo: user.Profile.photo };
            res.redirect("/pengajar");
          } else {
            res.redirect("/auth?message=Username or password is incorrect");
          }
        } else {
          return Student.findOne({ where: { [Op.or]: [{ username: username }, { email: username }] }, include: [studentProfile] });
        }
      })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            req.session.user = { id: user.id, role: user.role, fullName: user.studentProfile.fullName, photo: user.studentProfile.photo };
            return res.redirect("/siswa");
          } else {
            return res.redirect("/auth?message=Username or password is incorrect");
          }
        } else {
          if (!username || !password) {
            return res.redirect("/auth?message=Username and password required");
          } else {
            return res.redirect("/auth?message=Username or password is incorrect");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static getRegisterPage(req, res) {
    let errors = req.query.message;
    if (errors) {
      errors = errors.split(",");
    }

    res.render("auth/register", { message: errors });
  }

  static postRegisterPage(req, res) {
    const { username, email, password, role } = req.body;
    let query;

    if (role === "pengajar") {
      query = Teacher.create({ username, email, password, role }, { returning: true });
    } else {
      query = Student.create({ username, email, password, role }, { returning: true });
    }

    query
      .then((added) => {
        if (role === "pengajar") {
          return Profile.create({ money: 0, TeacherId: added.id });
        } else {
          return studentProfile.create({ money: 0, StudentId: added.id });
        }
      })
      .then((added) => {
        res.redirect("/auth?message=sukses");
      })
      .catch((err) => {
        console.log(err);
        let errors = [];
        if (err.name === "SequelizeUniqueConstraintError") {
          errors[0] = "Username atau email is already registered";
        } else {
          errors = err.errors.map((err) => err.message);
        }

        res.redirect(`/auth/register?message=${errors}`);
      });
  }
}

module.exports = C_auth;
