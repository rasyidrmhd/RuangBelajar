"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      studentProfile.belongsTo(models.Student, { foreignKey: "StudentId" });
    }

    getMoney() {
      return "Rp. " + this.money.toLocaleString("id-ID") + ",00";
    }
  }
  studentProfile.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      money: DataTypes.INTEGER,
      StudentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "studentProfile",
    }
  );
  return studentProfile;
};
