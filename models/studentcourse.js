"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // studentCourse.belongsTo(models.Student, { foreignKey: "StudentId" });
      // studentCourse.belongsTo(models.Course, { foreignKey: "CourseId" });
    }

    static getExpired(duration) {
      let result = new Date();
      result.setDate(result.getDate() + duration);

      return result;
    }
  }
  studentCourse.init(
    {
      expired: DataTypes.DATE,
      StudentId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "studentCourse",
    }
  );
  return studentCourse;
};
