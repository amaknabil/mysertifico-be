"use strict";

// --- MyWall
const USER_MYWALL_PARENT_ID = "2f8e5c6b-3d9f-5a0h-b2c3-d4e5f6a7b8c9";
const USER_MYWALL_STUDENT_ID = "3a9f6d7c-4e0a-6b1i-c3d4-e5f6a7b8c9d0";
const ROLE_MYWALL_PARENT_ID = "8e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b";
const ROLE_MYWALL_STUDENT_ID = "9f5a6b7c-8d9e-0f1a-2b3c-4d5e6f7a8b9c";

// --- BO
const USER_BO_ADMIN_ID = "4b0a7e8d-5f1b-7c2j-d4e5-f6a7b8c9d0e1";
const USER_BO_SUPER_ADMIN_ID = "3d6f0a9c-24d9-4f9e-bc4e-71f0a4f7f1df";
const ROLE_BO_SUPER_ADMIN_ID = "a06b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d";
const ROLE_BO_ADMIN_ID = "16fd2706-8baf-433b-82eb-8c7fada847da";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "user_roles",
      [
        {
          user_id: USER_MYWALL_PARENT_ID,
          role_id: ROLE_MYWALL_PARENT_ID,
          assigned_at: new Date(),
          is_active:true,
        },
        {
          user_id: USER_MYWALL_STUDENT_ID,
          role_id: ROLE_MYWALL_STUDENT_ID,
          assigned_at: new Date(),
          is_active:true,
        },
        {
          user_id: USER_BO_ADMIN_ID,
          role_id: ROLE_BO_ADMIN_ID,
          assigned_at: new Date(),
          is_active:true,
        },
        {
          user_id: USER_BO_SUPER_ADMIN_ID,
          role_id: ROLE_BO_SUPER_ADMIN_ID,
          assigned_at: new Date(),
          is_active:true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_roles", null, {});
  },
};
