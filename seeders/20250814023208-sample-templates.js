"use strict";

module.exports = {
  // The 'up' function is for adding the data.
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "templates", // The name of the table
      [
        {
         
          template_id: "basic_template_1",
          title: "Basic Certificate",
          style: "modern",
          orientation: "landscape",
          theme_color: "#FFFFFF",
          alignment: "center",
          blanko_url: "http://example.com/templates/basic_blanko.png",
          created_by: "system",
          elements_data: JSON.stringify({
            "elements": [
              { "type": "text", "content": "CERTIFICATE OF ACHIEVEMENT" }
            ]
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
         
          template_id: "advanced_template_2",
          title: "Advanced Diploma",
          style: "classic",
          orientation: "portrait",
          theme_color: "#EAEAEA",
          alignment: "left",
          blanko_url: "http://example.com/templates/advanced_blanko.png",
          created_by: "system",
          elements_data: JSON.stringify({
            "elements": [
              { "type": "text", "content": "This certifies that..." }
            ]
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // The 'down' function is for removing the data.
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("templates", null, {});
  },
};