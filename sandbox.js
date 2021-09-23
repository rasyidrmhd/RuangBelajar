const { Student, Teacher, studentProfile, Course, studentCourse } = require("./models");
const { Op } = require("sequelize");

Student.findOne({
  where: {
    id: 1,
  },
  include: [
    {
      model: Course,
      include: [Teacher],
    },
    { model: studentProfile },
  ],
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
