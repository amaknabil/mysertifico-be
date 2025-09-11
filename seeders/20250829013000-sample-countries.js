"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "countries",
      [
        {
          country_name: "Malaysia",
          country_code: "MY",
        },
        {
          country_name: "Indonesia",
          country_code: "ID",
        },
        {
          country_name: "Singapore",
          country_code: "SG",
        },
        {
          country_name: "Brunei",
          country_code: "BN",
        },
        {
          country_name: "Australia",
          country_code: "AU",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("countries", null, {});
  },
};