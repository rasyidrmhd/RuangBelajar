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
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Your email not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 12],
            msg: "Password must 8-12 character",
          },
        },
      },
      role: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg: "Select your role"
          }
        }
      },
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
