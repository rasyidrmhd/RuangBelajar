"use strict";
const fs = require("fs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = JSON.parse(fs.readFileSync("./assets/teacher.json"), "utf-8");
    data.forEach((d) => {
      d.createdAt = new Date();
      d.updatedAt = new Date();
    });

    return queryInterface.bulkInsert("Teachers", data);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Teachers", null, {});
  },
};
