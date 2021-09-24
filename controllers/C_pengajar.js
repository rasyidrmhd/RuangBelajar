const { Teacher, Profile, Course, Category } = require("../models");
const { dateFormatter, timeFormatter } = require("../helpers/dateFormatter");
const { Op } = require("sequelize");

class C_pengajar {
  static getHomePengajar(req, res) {
    let course;
    let where = {
      TeacherId: req.session.user.id,
    };
    if (req.query.search) {
      where.name = { [Op.iLike]: `%${req.query.search}%` };
    }

    Course.findAll({ where, include: [Category] })
      .then((dataCourses) => {
        course = dataCourses;
        return Teacher.findOne({ where: { id: req.session.user.id }, include: Profile });
      })
      .then((data) => {
        res.render("pengajar", { data, course, dateFormatter, timeFormatter, user: req.session.user });
      });
  }

  static getAddFormCourse(req, res) {
    let errors = req.query.message;
    let data;
    if (errors) {
      errors = errors.split(",");
    }

    Teacher.findOne({ where: { id: req.session.user.id }, include: Profile })
      .then((teacher) => {
        data = teacher;
        return Category.findAll();
      })
      .then((category) => {
        res.render("pengajar/addFormCourse", { data, user: req.session.user, errors, category });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postAddFormCourse(req, res) {
    const { name, description, duration, price, CategoryId } = req.body;

    Course.create({
      name,
      description,
      duration,
      price,
      TeacherId: req.session.user.id,
      CategoryId,
    })
      .then((added) => {
        res.redirect("/pengajar");
      })
      .catch((err) => {
        let errors = err.errors.map((err) => err.message);
        res.redirect(`/pengajar/add-course?message=${errors}`);
      });
  }

  static getEditFormCourse(req, res) {
    let errors = req.query.message;
    let data;
    if (errors) {
      errors = errors.split(",");
    }

    Course.findOne({
      where: {
        id: Number(req.params.courseId),
      },
      include: [
        {
          model: Teacher,
          include: Profile,
        },
        Category,
      ],
    })
      .then((course) => {
        data = course;
        return Category.findAll();
      })
      .then((category) => {
        res.render("pengajar/editFormCourse", { user: req.session.user, data: data.Teacher, course: data, errors, category, message: req.query.success });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postEditFormCourse(req, res) {
    const { name, duration, price, description, CategoryId } = req.body;
    console.log(name, duration, price, CategoryId);

    Course.update(
      {
        name,
        duration: Number(duration),
        price: Number(price),
        description,
        TeacherId: Number(req.session.user.id),
        CategoryId,
      },
      {
        where: {
          id: Number(req.params.courseId),
        },
      }
    )
      .then((updated) => {
        res.redirect(`/pengajar/${req.params.courseId}/detailCourse?success=sukses`);
      })
      .catch((err) => {
        let errors = err.errors.map((err) => err.message);
        res.redirect(`/pengajar/${req.params.courseId}/detailCourse?message=${errors}`);
      });
  }

  static getDeleteCourse(req,res){
    Course.destroy({
      where:{
        id: Number(req.params.courseId)
      }
    }).then(deleted=>{
      res.redirect('/pengajar')
    }).catch(err=>{
      res.send(err)
    })
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
