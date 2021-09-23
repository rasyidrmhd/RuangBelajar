const { Teacher, Student, Course, studentCourse, Profile } = require("./models");

// Course.findAll()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Course.findAll({
//   include: [Student, Teacher],
//   raw: true,
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Teacher.findOne({
  include: [Profile],
  where: {
    id: 13,
  },
  raw: true,
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
