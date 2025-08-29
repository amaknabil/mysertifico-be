"use strict";

const USER_MYWALL_STUDENT_ID_1_1 = '3a9f6d7c-4e0a-6b1a-c3d4-e5f6a7b8c9d0';
const USER_MYWALL_STUDENT_ID_1_2 = '5ccea570-1277-4825-9a07-393d42d6649d';

const PROFILE_USER_MYWALL_STUDENT_ID_1_1 = '5492fa4c-d16c-4fd6-bb44-db3b636acd86';
const PROFILE_USER_MYWALL_STUDENT_ID_1_2 = 'a8018b89-0486-4dfa-a6b6-7f3e5e0f01d3';

//national id
const ni_std_1 = "850101101234";
const ni_std_2 = "750202082345";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("profiles", [
      {
        profile_id: PROFILE_USER_MYWALL_STUDENT_ID_1_1,
        user_id: USER_MYWALL_STUDENT_ID_1_1,
        national_id: ni_std_1,
        phone_number: "0123456789",
        address: "123 Jalan Teknologi",
        city: "Kuala Lumpur",
        postcode: "50480",
        about_me:
          "A passionate software engineer with a love for building scalable web applications.",
        skills: "Node.js, Sequelize, Express, React",
        linkedin_url: "https://linkedin.com/in/sertifico-admin",
        github_url: "https://github.com/sertifico-admin",
        portfolio_url: "https://sertifico-admin.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        profile_id: PROFILE_USER_MYWALL_STUDENT_ID_1_2,
        user_id: USER_MYWALL_STUDENT_ID_1_2,
        national_id: ni_std_2,
        phone_number: "0198765432",
        address: "456 Lorong Aman",
        city: "Petaling Jaya",
        postcode: "47300",
        about_me: "Parent of two, actively involved in the school community.",
        skills: "Management, Communication, Event Planning",
        linkedin_url: null,
        github_url: null,
        portfolio_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("profiles", null, {});
  },
};
