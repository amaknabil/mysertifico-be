"use strict";
const bcryptjs = require('bcryptjs');

// 1st group of organization
const USER_SERTIFICO_SUPER_ADMIN_ID = '1e7d4b5a-2c8e-4f9e-a1b2-c3d4e5f6a7b8';
const USER_SERTIFICO_CREATOR_ID = '8ca44fcf-977d-4c57-bd5d-2d5d2dbef13d';
const USER_SERTIFICO_VERIFIER_ID = '843a5ce3-06f2-42ce-8a5a-d954a6c9793c';
const USER_SERTIFICO_SIGNATORY_ID = '47e8c247-64ad-4044-b976-ee6a445a6258';

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
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('12345678', salt);
    return queryInterface.bulkInsert(
      "Users",
      [
        {

          //organization account
          user_id: USER_SERTIFICO_SUPER_ADMIN_ID,
          email: 'mysertifico.super_admin@example.com',
          password: hashedPassword,
          full_name: ' MR. Super Admin',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_SERTIFICO_CREATOR_ID,
          email: 'mysertifico.issuer@example.com',
          password: hashedPassword,
          full_name: ' MR. Creator',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_SERTIFICO_VERIFIER_ID,
          email: 'mysertifico.verifier@example.com',
          password: hashedPassword,
          full_name: ' MR. Verifier',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_SERTIFICO_SIGNATORY_ID,
          email: 'mysertifico.signatory@example.com',
          password: hashedPassword,
          full_name: ' MR. Signatory',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //mywall acount
        {
          user_id: USER_MYWALL_PARENT_ID_1,
          email: 'mywall.parent@example.com',
          password: hashedPassword,
          full_name: 'Mr Parent 1',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_MYWALL_STUDENT_ID_1_1,
          email: 'mywall.student1@example.com',
          password: hashedPassword,
          full_name: 'Mr Children 1.1',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          user_id: USER_MYWALL_STUDENT_ID_1_2,
          email: 'mywall.student2@example.com',
          password: hashedPassword,
          full_name: 'Mr Children 1.2',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_BO_ADMIN_ID,
          email: 'bo.admin@example.com',
          password: hashedPassword,
          full_name: 'Mr BO Admin',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: USER_BO_SUPER_ADMIN_ID,
          email: 'bo.superadmin@example.com',
          password: hashedPassword,
          full_name: 'Mr BO Super Admin',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          user_id: USER_BO_MANAGER_ID,
          email: 'bo.manager@example.com',
          password: hashedPassword,
          full_name: 'Mr BO Manager',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};