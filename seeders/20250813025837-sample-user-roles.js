"use strict";

//mywall role
const ROLE_MYWALL_PARENT_ID = '6a3d8b4e-5f0c-7d2d-b3c4-e5f6a7b8c9d0';
const ROLE_MYWALL_STUDENT_ID = '7b4e9c5f-6a1d-8e3e-c4d5-f6a7b8c9d0e1';


//BO role
const ROLE_BO_ADMIN_ID = '8c5f0d6a-7b2e-9f4c-d5e6-a7b8c9d0e1f2';
const ROLE_BO_SUPER_ADMIN_ID = '9d6f1e7b-8c3f-a05d-e6f7-b8c9d0e1f2g3';
const ROLE_BO_MANAGER_ID = 'e54cba8d-86db-4877-b6da-5d73bd419039';

//1st group of mywall
const USER_MYWALL_PARENT_ID_1 = '2f8e5c6b-3d9f-5a0a-b2c3-d4e5f6a7b8c9';
const USER_MYWALL_STUDENT_ID_1_1 = '3a9f6d7c-4e0a-6b1a-c3d4-e5f6a7b8c9d0';
const USER_MYWALL_STUDENT_ID_1_2 = '5ccea570-1277-4825-9a07-393d42d6649d';

//1st group of BO
const USER_BO_ADMIN_ID = '4b0a7e8d-5f1b-7c2a-d4e5-f6a7b8c9d0e1';
const USER_BO_MANAGER_ID = 'c48fb068-b22b-4446-819e-1ac9723e8018';
const USER_BO_SUPER_ADMIN_ID = '3d6f0a9c-24d9-4f9e-bc4e-71f0a4f7f1df';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "user_roles",
      [
        {
          user_id: USER_MYWALL_PARENT_ID_1,
          role_id: ROLE_MYWALL_PARENT_ID,
          assigned_at: new Date(),
          is_active: true,
        },
        {
          user_id: USER_MYWALL_STUDENT_ID_1_1,
          role_id: ROLE_MYWALL_STUDENT_ID,
          assigned_at: new Date(),
          is_active: true,
        },
        {
          user_id: USER_MYWALL_STUDENT_ID_1_2,
          role_id: ROLE_MYWALL_STUDENT_ID,
          assigned_at: new Date(),
          is_active: true,
        },
        {
          user_id: USER_BO_ADMIN_ID,
          role_id: ROLE_BO_ADMIN_ID,
          assigned_at: new Date(),
          is_active: true,
        },
        {
          user_id: USER_BO_SUPER_ADMIN_ID,
          role_id: ROLE_BO_SUPER_ADMIN_ID,
          assigned_at: new Date(),
          is_active: true,
        },
        {
          user_id: USER_BO_MANAGER_ID,
          role_id: ROLE_BO_MANAGER_ID,
          assigned_at: new Date(),
          is_active: true,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_roles", null, {});
  },
};