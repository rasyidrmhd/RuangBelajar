"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Teacher, { foreignKey: "TeacherId" });
      Course.belongsToMany(models.Student, { through: models.studentCourse });
    }

    getPrice() {
      return "Rp. " + this.price.toLocaleString("id-ID") + ",00";
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      TeacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
