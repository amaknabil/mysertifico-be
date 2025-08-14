"use strict";

const ORG_SERTIFICO_ACADEMY_ID = "5c1b8f9e-6a2c-8d3k-e5f6-a7b8c9d0e1f2";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "organizations",
      [
        {
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          organization_name: "MySertifico Academy",
          is_active:true,
          createdAt: new Date(),
          updatedAt:new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('organizations', null, {});
  },
};
