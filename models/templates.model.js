const { DataTypes } = require("sequelize");

const templateModel = (db) => {
  const Template = db.define(
    "Template",
    {
      template_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      style: {
        type: DataTypes.STRING,
      },
      orientation: {
        type: DataTypes.STRING,
      },
      theme_color: {
        type: DataTypes.STRING,
      },
      alignment: {
        type: DataTypes.STRING,
      },
      blanko_url: {
        type: DataTypes.STRING,
        validate: { isUrl: { msg: "Please Provide a valid Url" } },
      },
      created_by: {
        type: DataTypes.STRING,
      },
      elements_data: {
        type: DataTypes.TEXT, // Using TEXT for potentially large JSON data
      },
    },

  );

  return Template;
};

module.exports = { templateModel };