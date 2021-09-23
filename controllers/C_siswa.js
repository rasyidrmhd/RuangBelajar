const { Student, studentProfile, Course, studentCourse, Teacher, Profile } = require("../models");
const { dateFormatter, timeFormatter } = require("../helpers/dateFormatter");
const { Op } = require("sequelize");

class C_siswa {
  static getHomeSiswa(req, res) {
    Student.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [Course, studentProfile],
    })
      .then((data) => {
        res.render("siswa", { data, dateFormatter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getListCourse(req, res) {
    Course.findAll({
      include: [Teacher, Student],
    })
      .then((data) => {
        res.render("siswa/sewaCourse", { data, id: req.session.user.id, dateFormatter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getTopUp(req, res) {
    res.render("siswa/formTopup");
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
    let data = { course: null, teacher: null };
    Course.findOne({
      include: [Teacher],
      where: {
        id: req.params.courseId,
      },
    })
      .then((course) => {
        data.course = course;
        return Profile.findOne({
          where: {
            TeacherId: course.TeacherId,
          },
        });
      })
      .then((teacher) => {
        data.teacher = teacher;
        console.log(data.teacher);
        res.render("siswa/course", { data });
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
