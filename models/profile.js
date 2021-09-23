"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.Teacher, { foreignKey: "TeacherId" });
    }

    getMoney() {
      return "Rp. " + this.money.toLocaleString("id-ID") + ",00";
    }
  }
  Profile.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      money: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      TeacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
