"use strict";
const { v4: uuidv4 } = require('uuid');
//user
const USER_MYWALL_PARENT_ID_1 = '2f8e5c6b-3d9f-5a0a-b2c3-d4e5f6a7b8c9';
const USER_MYWALL_STUDENT_ID_1_1 = '3a9f6d7c-4e0a-6b1a-c3d4-e5f6a7b8c9d0';
const USER_MYWALL_STUDENT_ID_1_2 = '5ccea570-1277-4825-9a07-393d42d6649d';

//plan
const mywall_my_1 = "d6e7f8a1-b2c3-d4e5-f6a7-b8c9d0e1f2a3"; // standard plan
const mywall_my_2 = "e7f8a1b2-c3d4-e5f6-a7b8-c9d0e1f2a3b4";
const mywall_my_3 = "f8a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5";// family plan

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_plans", [
      {
        user_plan_id: uuidv4(),
        user_id: USER_MYWALL_PARENT_ID_1,
        plan_id: mywall_my_3,
        start_date: new Date("2025-01-15"),
        end_date: new Date("2026-01-15"),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_plan_id: uuidv4(),
        user_id: USER_MYWALL_STUDENT_ID_1_1,
        plan_id: mywall_my_1,
        start_date: new Date("2025-03-10"),
        end_date: new Date("2026-03-10"),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_plan_id: uuidv4(),
        user_id: USER_MYWALL_STUDENT_ID_1_2,
        plan_id: mywall_my_1,
        start_date: new Date("2024-11-20"),
        end_date: new Date("2025-11-20"),
        status: "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_plans", null, {});
  },
};
