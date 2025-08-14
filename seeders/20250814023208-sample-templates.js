"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "templates", // The name of the table
      [
        {
          template_id: "basic_template_1",
          template_code: "BASIC_CERT", // New column
          title: "Basic Certificate",
          style: "modern",
          orientation: "landscape",
          theme_color: "#FFFFFF",
          global_alignment: "center", // New column
          blanko_url: "http://example.com/templates/basic_blanko.png",
          metadata: JSON.stringify({ // New column
            "version": "1.0",
            "tags": ["certificate", "basic"]
          }),
          created_by: "system",
          updated_by: "system",
          is_active: true,
          created_date: new Date(), // New column name from model
          updated_date: new Date(), // New column name from model
        },
        {
          template_id: "advanced_template_2",
          template_code: "ADVANCED_DIPLOMA", // New column
          title: "Advanced Diploma",
          style: "classic",
          orientation: "portrait",
          theme_color: "#EAEAEA",
          global_alignment: "left", // New column
          blanko_url: "http://example.com/templates/advanced_blanko.png",
          metadata: JSON.stringify({ // New column
            "version": "1.0",
            "tags": ["diploma", "advanced"]
          }),
          created_by: "system",
          updated_by: "system",
          is_active: true,
          created_date: new Date(), // New column name from model
          updated_date: new Date(), // New column name from model
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("templates", null, {});
  },
};