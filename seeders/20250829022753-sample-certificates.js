"use strict";
// --- Import UUIDs from other seeders ---


const USER_SERTIFICO_CREATOR_ID = '8ca44fcf-977d-4c57-bd5d-2d5d2dbef13d';
const USER_MYWALL_STUDENT_ID_1_1 = '3a9f6d7c-4e0a-6b1a-c3d4-e5f6a7b8c9d0';
const USER_MYWALL_STUDENT_ID_1_2 = '5ccea570-1277-4825-9a07-393d42d6649d';

const ORG_SERTIFICO_ACADEMY_ID = "5c1b8f9e-6a2c-8d3a-e5f6-a7b8c9d0e1f2";


const TEMPLATE_ID_1="67d4d7ff-7a89-439f-a189-c3bc408dccb0"
const TEMPLATE_ID_2="f60552d5-d866-4b92-89cf-27c2d26b42b9"

// --- Define new UUIDs for this seeder ---
const BATCH_ID_1 = "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d8";
const BATCH_ID_2 = "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7";
const RECIPIENT_ID_1 = "c3d4e5f6-a7b8-c9d0-e1f2a3b4c5d6e7f8";
const RECIPIENT_ID_2 = "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a1";
const RECIPIENT_ID_3 = "f37503b3-afb9-4bbb-8de7-04337bcc589e";
const RECIPIENT_ID_4 = "940679a2-6cca-4bc5-a46f-63c6890324c9";

//national id
const ni_std_1 = "850101101234";
const ni_std_2 = "750202082345";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // --- Seed Certificate Batches ---
    await queryInterface.bulkInsert("certificate_batches", [
      {
        batch_id: BATCH_ID_1,
        template_id: TEMPLATE_ID_1,
        organization_id: ORG_SERTIFICO_ACADEMY_ID,
        creator_id: USER_SERTIFICO_CREATOR_ID,
        title: "Web Development Bootcamp - Cohort 1",
        status: "Completed",
        issued_at: new Date("2025-06-15 10:00:00"),
      },
      {
        batch_id: BATCH_ID_2,
        template_id: TEMPLATE_ID_2,
        organization_id: ORG_SERTIFICO_ACADEMY_ID,
        creator_id: USER_SERTIFICO_CREATOR_ID,
        title: "Data Science Workshop - August 2025",
        status: "Pending",
        issued_at: new Date("2025-08-28 14:30:00"),
      },
    ]);

    // --- Seed Certificate Recipients ---
    await queryInterface.bulkInsert("certificate_recipients", [
      {
        recipient_id: RECIPIENT_ID_1,
        batch_id: BATCH_ID_1,
        national_id: ni_std_1, // Example recipient
        issued_at: new Date("2025-06-15 10:00:00"),
      },
      {
        recipient_id: RECIPIENT_ID_2,
        batch_id: BATCH_ID_1,
        national_id: ni_std_2, // Example recipient
        issued_at: new Date("2025-06-15 10:00:00"),
      },
      {
        recipient_id: RECIPIENT_ID_3,
        batch_id: BATCH_ID_2,
        national_id: ni_std_1, // Example recipient
        issued_at: new Date("2025-08-28 14:30:00"),
      },
      {
        recipient_id: RECIPIENT_ID_4,
        batch_id: BATCH_ID_2,
        national_id: ni_std_2, // Example recipient
        issued_at: new Date("2025-08-28 14:30:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("certificate_recipients", null, {});
    await queryInterface.bulkDelete("certificate_batches", null, {});
  },
};
