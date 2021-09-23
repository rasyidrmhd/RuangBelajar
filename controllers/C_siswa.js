const { Student, studentProfile, Course, studentCourse, Teacher, Profile, Category } = require("../models");
const { dateFormatter, timeFormatter } = require("../helpers/dateFormatter");
const { Op } = require("sequelize");

class C_siswa {
  static getHomeSiswa(req, res) {
    let where = {};
    if (req.query.search) {
      where = {
        name: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      };
    }

    Student.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [{ model: Course, where: where, include: [Category, { model: Teacher, include: [Profile] }] }, { model: studentProfile }],
    })
      .then((data) => {
        res.render("siswa", { data, dateFormatter, user: req.session.user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getListCourse(req, res) {
    let course;
    let where = {};
    if (req.query.search) {
      where = {
        name: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      };
    }

    Course.findAll({
      include: [{ model: Teacher, include: [Profile] }, Student, Category],
      where: where,
    })
      .then((data) => {
        course = data;
        console.log(data);
        return Student.findOne({ where: { id: req.session.user.id }, include: studentProfile });
      })
      .then((profile) => {
        res.render("siswa/sewaCourse", { data: profile, id: req.session.user.id, dateFormatter, user: req.session.user, course });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postTopUp(req, res) {
    const { money } = req.body;
    studentProfile
      .increment(
        { money: money },
        {
          where: {
            StudentId: req.session.user.id,
          },
        }
      )
      .then((updated) => {
        res.redirect("/siswa");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getRentCourse(req, res) {
    let price;
    let teacherId;
    Course.findOne({
      where: {
        id: Number(req.params.courseId),
      },
    })
      .then((dataCourse) => {
        let expired = studentCourse.getExpired(dataCourse.duration);
        price = dataCourse.price;
        teacherId = dataCourse.TeacherId;

        return studentCourse.create({
          expired,
          StudentId: req.session.user.id,
          CourseId: dataCourse.id,
        });
      })
      .then((added) => {
        return Profile.increment(
          { money: price },
          {
            where: { TeacherId: teacherId },
          }
        );
      })
      .then((updated) => {
        return studentProfile.decrement(
          { money: price },
          {
            where: { StudentId: req.session.user.id },
          }
        );
      })
      .then((updated) => {
        res.redirect("/siswa");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getDetailCourse(req, res) {
    let course;
    Course.findOne({
      include: [{ model: Teacher, include: [Profile] }, Category],
      where: {
        id: req.params.courseId,
      },
    })
      .then((data) => {
        course = data;
        return Student.findOne({ where: { id: req.session.user.id }, include: studentProfile });
      })
      .then((profile) => {
        res.render("siswa/course", { data: profile, course, user: req.session.user, dateFormatter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getDeleteCourse(req, res) {
    studentCourse
      .destroy({
        where: {
          [Op.and]: [{ CourseId: Number(req.params.courseId) }, { StudentId: req.session.user.id }],
        },
      })
      .then((deleted) => {
        res.redirect("/siswa");
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

module.exports = C_siswa;
