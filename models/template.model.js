// const { DataTypes } = require("sequelize");
'use strict';
const { Model } = require('sequelize');

/**
 * @openapi
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       properties:
 *         template_id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the template.
 *         title:
 *           type: string
 *           description: Template title.
 *         style:
 *           type: string
 *           description: Template style (e.g., 'modern', 'classic').
 *         orientation:
 *           type: string
 *           description: Template orientation (e.g., 'portrait', 'landscape').
 *         theme_color:
 *           type: string
 *           description: Template color theme (e.g., '#FFFFFF').
 *         alignment:
 *           type: string
 *           description: Text alignment of the template (e.g., 'center', 'left').
 *         blanko_url:
 *           type: string
 *           format: url
 *           description: The URL to the blank template image.
 *         
 *       required:
 *         - template_id
 *         - title
 *         - style
 *         - orientation
 *         - theme_color
 *         - alignment
 *         - blanko_url
 */

module.exports = (sequelize, DataTypes) => {
  class Template extends Model{

  }
  Template.init(
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
    },{
      sequelize,
      tableName:'templates',
      modelName:'Template'
    }
  );

  return Template;
};


// const templateModel = (db) => {
//   const Template = db.define(
//     "Template",
//     {
//       template_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       style: {
//         type: DataTypes.STRING,
//       },
//       orientation: {
//         type: DataTypes.STRING,
//       },
//       theme_color: {
//         type: DataTypes.STRING,
//       },
//       alignment: {
//         type: DataTypes.STRING,
//       },
//       blanko_url: {
//         type: DataTypes.STRING,
//         validate: { isUrl: { msg: "Please Provide a valid Url" } },
//       },
//       created_by: {
//         type: DataTypes.STRING,
//       },
//       elements_data: {
//         type: DataTypes.TEXT, // Using TEXT for potentially large JSON data
//       },
//     },
//   );

//   return Template;
// };

// module.exports = { templateModel };
