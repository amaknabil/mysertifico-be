"use strict";
const bcryptjs = require('bcryptjs');

// Define User UUIDs
const USER_SERTIFICO_SUPER_ADMIN_ID = '1e7d4b5a-2c8e-4f9g-a1b2-c3d4e5f6a7b8';
const USER_MYWALL_PARENT_ID = '2f8e5c6b-3d9f-5a0h-b2c3-d4e5f6a7b8c9';
const USER_MYWALL_STUDENT_ID = '3a9f6d7c-4e0a-6b1i-c3d4-e5f6a7b8c9d0';
const USER_BO_ADMIN_ID = '4b0a7e8d-5f1b-7c2j-d4e5-f6a7b8c9d0e1';
const USER_BO_SUPER_ADMIN_ID = '3d6f0a9c-24d9-4f9e-bc4e-71f0a4f7f1df';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('12345678', salt);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
        user_id: USER_SERTIFICO_SUPER_ADMIN_ID,
        email: 'sertifico.admin@example.com',
        password: hashedPassword,
        full_name: 'Mr Sertifico',
        is_active:true,
        createdAt: new Date(),
        updatedAt:new Date()
      },
      {
        user_id: USER_MYWALL_PARENT_ID,
        email: 'mywall.parent@example.com',
        password: hashedPassword,
        full_name: 'Fatimah',
        is_active:true,
        createdAt: new Date(),
        updatedAt:new Date()
      },
      {
        user_id: USER_MYWALL_STUDENT_ID,
        email: 'mywall.student@example.com',
        password: hashedPassword,
        full_name: 'Boon',
        is_active:true,
        createdAt: new Date(),
        updatedAt:new Date()
      },
       {
        user_id: USER_BO_ADMIN_ID,
        email: 'bo.admin@example.com',
        password: hashedPassword,
        full_name: 'Chandra',
        is_active:true,
        createdAt: new Date(),
        updatedAt:new Date()
      },
      {
        user_id: USER_BO_SUPER_ADMIN_ID,
        email: 'bo.superadmin@example.com',
        password: hashedPassword,
        full_name: 'Chandra',
        is_active:true,
        createdAt: new Date(),
        updatedAt:new Date()
      },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Users', null, {});
  },
};
