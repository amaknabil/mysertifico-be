"use strict";

const LOGO_1_ID = "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";
const LOGO_2_ID = "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e";

module.exports = {
  // The 'up' function is for adding the data.
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "logos", // The name of the table
      [
        {
         
          logo_id: LOGO_1_ID,
          file_name: "company_logo_main.png",
          file_url: "http://example.com/images/logo1.png",
          file_type: "image/png",
          file_size: 1024,
          is_primary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
      
          logo_id: LOGO_2_ID,
          file_name: "company_logo_secondary.jpg",
          file_url: "http://example.com/images/logo2.jpg",
          file_type: "image/jpeg",
          file_size: 2048,
          is_primary: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // The 'down' function is for removing the data.
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("logos", null, {});
  },
};