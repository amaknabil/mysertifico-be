"use strict";

// --- MySertifico
const MYSERTIFICO_APP_ID = "4a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d"; // Example UUID
const ROLE_SERTIFICO_SUPER_ADMIN_ID = "7d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a";
const ROLE_SERTIFICO_ADMIN_ID = "7c9e6679-7425-40de-944b-e07fc1f90ae7";
const ROLE_SERTIFICO_CREATOR_ID = "550e8400-e29b-41d4-a716-446655440000";
const ROLE_SERTIFICO_VERIFIER_ID = "123e4567-e89b-12d3-a456-426614174000";
const ROLE_SERTIFICO_SIGNATORY_ID = "6f9619ff-8b86-d011-b42d-00cf4fc964ff";

// --- MyWall
const MYWALL_APP_ID = "5b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e"; // Example UUID
const ROLE_MYWALL_PARENT_ID = "8e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b";
const ROLE_MYWALL_STUDENT_ID = "9f5a6b7c-8d9e-0f1a-2b3c-4d5e6f7a8b9c";

// --- BO
const BO_APP_ID = "6c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f"; // Example UUID
const ROLE_BO_SUPER_ADMIN_ID = "a06b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d";
const ROLE_BO_ADMIN_ID = "16fd2706-8baf-433b-82eb-8c7fada847da";




/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "roles",
      [
        // MySertifico Roles
        {
          role_id: ROLE_SERTIFICO_SUPER_ADMIN_ID,
          role_name: "Super Admin",
          app_id: MYSERTIFICO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_SERTIFICO_ADMIN_ID,
          role_name: "Admin",
          app_id: MYSERTIFICO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_SERTIFICO_CREATOR_ID,
          role_name: "Creator",
          app_id: MYSERTIFICO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_SERTIFICO_VERIFIER_ID,
          role_name: "Verifier",
          app_id: MYSERTIFICO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_SERTIFICO_SIGNATORY_ID,
          role_name: "Signatory",
          app_id: MYSERTIFICO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
    

        // MyWall Roles
        {
          role_id: ROLE_MYWALL_PARENT_ID,
          role_name: "Parent",
          app_id: MYWALL_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_MYWALL_STUDENT_ID,
          role_name: "Student",
          app_id: MYWALL_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },

        // BO Roles
        {
          role_id: ROLE_BO_SUPER_ADMIN_ID,
          role_name: "Super Admin",
          app_id: BO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          role_id: ROLE_BO_ADMIN_ID,
          role_name: "Admin",
          app_id: BO_APP_ID,
          createdAt: new Date(),
          updatedAt:new Date()
        }
      
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
