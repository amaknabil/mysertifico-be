"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Contact_Us extends Model {}

  Contact_Us.init(
    {
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unread",
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "contact_us",
      modelName: "Contact_Us",
    }
  );

  return Contact_Us;
};

// Alternative definition
// const contactUsModel = (db) => {
//   return db.define("Contact_Us", {
//     id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     fullname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     message: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   });
// };
// module.exports = { contactUsModel };
