"use strict";

const USER_SERTIFICO_SUPER_ADMIN_ID = '1e7d4b5a-2c8e-4f9e-a1b2-c3d4e5f6a7b8';
const ORG_SERTIFICO_ACADEMY_ID = "5c1b8f9e-6a2c-8d3a-e5f6-a7b8c9d0e1f2";
const ROLE_SERTIFICO_SUPER_ADMIN_ID = "5f2c7a3d-4e9b-6c1f-a2b3-d4e5f6a7b8c9";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "user_organization_roles",
      [
        {
          user_id: USER_SERTIFICO_SUPER_ADMIN_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_SUPER_ADMIN_ID,
          is_active: true,
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