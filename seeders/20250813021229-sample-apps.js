"use strict";
// --- IDs from other seeders (copy these for consistency) ---
const MYSERTIFICO_APP_ID = "4a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d"; // Example UUID
const MYWALL_APP_ID = "5b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e"; // Example UUID
const BO_APP_ID = "6c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f"; // Example UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "apps",
      [
        {
          app_id: MYSERTIFICO_APP_ID,
          app_name: "MySertifico",
          app_code: 'MS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          app_id: MYWALL_APP_ID,
          app_name: "MyWall",
          app_code: 'MW',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          app_id: BO_APP_ID,
          app_name: "Back Office",
          app_code: 'BO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("apps", null, {});
  },
};
