"use strict";

const ROLE_SERTIFICO_SUPER_ADMIN_ID = '5f2c7a3d-4e9b-6c1f-a2b3-d4e5f6a7b8c9';
const ROLE_MYWALL_PARENT_ID = '6a3d8b4e-5f0c-7d2d-b3c4-e5f6a7b8c9d0';
const ROLE_MYWALL_STUDENT_ID = '7b4e9c5f-6a1d-8e3e-c4d5-f6a7b8c9d0e1';
const ROLE_BO_ADMIN_ID = '8c5f0d6a-7b2e-9f4c-d5e6-a7b8c9d0e1f2';
const ROLE_BO_SUPER_ADMIN_ID = '9d6f1e7b-8c3f-a05d-e6f7-b8c9d0e1f2g3';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          role_id: ROLE_SERTIFICO_SUPER_ADMIN_ID,
          role_name: "Sertifico Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: ROLE_MYWALL_PARENT_ID,
          role_name: "Mywall Parent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: ROLE_MYWALL_STUDENT_ID,
          role_name: "Mywall Student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: ROLE_BO_ADMIN_ID,
          role_name: "BO Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: ROLE_BO_SUPER_ADMIN_ID,
          role_name: "BO Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};