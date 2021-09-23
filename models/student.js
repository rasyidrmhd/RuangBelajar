"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasOne(models.studentProfile, { foreignKey: "StudentId" });
      Student.belongsToMany(models.Course, { through: models.studentCourse });
    }
  }
  Student.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Masukkan username Anda",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Masukkan email Anda",
          },
          isEmail: {
            msg: "Email Anda tidak valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 12],
            msg: "Password harus 8-12 karakter",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        },
      },
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
