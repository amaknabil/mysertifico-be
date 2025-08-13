"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     ContactUsResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the contact submission.
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         fullname:
 *           type: string
 *           description: The full name of the person who submitted the form.
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the submitter.
 *           example: "jane.smith@example.com"
 *         message:
 *           type: string
 *           description: The message content.
 *           example: "I have a question about your services."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the submission was created.
 *
 *     CreateContactUsDto:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - message
 *       properties:
 *         fullname:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         message:
 *           type: string
 *           example: "This is a test message."
 */

module.exports = (sequelize, DataTypes) => {
  class Contact_Us extends Model {}

  Contact_Us.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },{
    sequelize,
    tableName:'contact_us',
    modelName:'Contact_Us'
  });
  return Contact_Us
};


// const contactUsModel = (db) => {
//     return db.define('Contact_Us',{
//         id:{
//             type:DataTypes.UUID,
//             allowNull:false,
//             primaryKey:true,
//             defaultValue:DataTypes.UUIDV4

//         },
//         fullname:{
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         email:{
//             type:DataTypes.STRING,
//             allowNull:false
//         },
//         message:{
//             type: DataTypes.TEXT,
//             allowNull:false
//         }

//     })
// }
// module.exports = { contactUsModel }
