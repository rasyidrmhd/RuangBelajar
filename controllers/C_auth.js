const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

class C_auth {
  static getLoginPage(req, res) {
    res.render("auth/login", { message: req.query.message });
  }

  static postLoginPage(req, res) {
    const { username, password } = req.body;

    User.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
          {
            email: username,
          },
        ],
      },
    })
      .then((user) => {
        if (user) {
          req.session.user = { id: user.id, role: user.role };
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            if (user.role === "pengajar") {
              return res.redirect("/pengajar");
            } else {
              return res.redirect("/siswa");
            }
          } else {
            return res.redirect("/auth?message=Username atau password Anda salah");
          }
        } else {
          if (!username || !password) {
            return res.redirect("/auth?message=Mohon isi username dan password Anda");
          } else {
            return res.redirect("/auth?message=Username atau password Anda salah");
          }
        }
      })
      .catch((err) => {
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

    User.create({
      username,
      email,
      password,
      role,
    })
      .then((added) => {
        res.redirect("/auth?message=Akun Anda berhasil dibuat, silahkan login");
      })
      .catch((err) => {
        let errors = [];
        if (err.name === "SequelizeUniqueConstraintError") {
          errors[0] = "Username atau email sudah terdaftar";
        } else {
          errors = err.errors.map((err) => err.message);
        }

        res.redirect(`/auth/register?message=${errors}`);
      });
  }
}

module.exports = C_auth;
