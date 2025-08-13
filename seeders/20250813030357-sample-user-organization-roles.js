"use strict";

const USER_SERTIFICO_SUPER_ADMIN_ID = '1e7d4b5a-2c8e-4f9g-a1b2-c3d4e5f6a7b8';
const ORG_SERTIFICO_ACADEMY_ID = "5c1b8f9e-6a2c-8d3k-e5f6-a7b8c9d0e1f2";
const ROLE_SERTIFICO_SUPER_ADMIN_ID = "7d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "user_organization_roles",
      [
        {
          user_id: USER_SERTIFICO_SUPER_ADMIN_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_SUPER_ADMIN_ID,
          is_active:true,
          assigned_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_organization_roles", null, {});
  },
};
