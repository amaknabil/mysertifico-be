// const { DataTypes } = require("sequelize")
"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     BatchResponse:
 *       type: object
 *       properties:
 *         batch_id:
 *           type: string
 *           format: uuid
 *         template_id:
 *           type: string
 *           format: uuid
 *         organization_id:
 *           type: string
 *           format: uuid
 *         creator_id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         status:
 *           type: string
 *         issued_at:
 *           type: string
 *           format: date-time
 *
 *     CreateBatchDto:
 *       type: object
 *       required:
 *         - organization_id
 *         - template_id
 *         - title
 *         - list_recipient_id
 *       properties:
 *         organization_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the issuing organization.
 *         template_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the certificate template to use.
 *         title:
 *           type: string
 *           description: A descriptive title for this batch (e.g., "Q3 Graduates").
 *           example: "Q3 Advanced JavaScript Graduates"
 *         list_recipient_id:
 *           type: array
 *           description: An array of user_ids for the recipients.
 *           items:
 *             type: string
 *             format: uuid
 *
 *     BatchSummaryResponse:
 *       type: object
 *       properties:
 *         batchName:
 *           type: string
 *           example: "Q3 Advanced Graduates"
 *         issueDate:
 *           type: string
 *           format: date-time
 *         recipientCount:
 *           type: integer
 *           example: 150
 *
 *     Organization:
 *       type: object
 *       properties:
 *         organization_name:
 *           type: string
 *           example: "My Awesome Company"
 */

module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    static associate(models) {
      //one batch has many recipient
      Batch.hasMany(models.Recipient, { foreignKey: "batch_id" });

      //one user can create many certificate_batches
      Batch.belongsTo(models.User, { foreignKey: "creator_id" });

      //one org can have many certificate_batches
      Batch.belongsTo(models.Organization, { foreignKey: "organization_id" });
    }
  }

  Batch.init(
    {
      batch_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      template_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      creator_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "certificate_batches",
      timestamps: true,
      createdAt: "issued_at",
      updatedAt: false,
      modelName:'Batch'
    }
  );

  return Batch;
};


// const batchModel = (db) => {
//     const Batch = db.define('Batch',{
//         batch_id:{
//             type:DataTypes.UUID,
//             primaryKey:true,
//             defaultValue:DataTypes.UUIDV4
//         },
//         template_id:{
//             type:DataTypes.UUID,
//             allowNull:false,
//             defaultValue:DataTypes.UUIDV4
//         },
//         organization_id:{
//             type:DataTypes.UUID,
//             allowNull:false
//         },
//         creator_id:{
//              type:DataTypes.UUID,
//              allowNull:false
//         },
//         title:{
//             type:DataTypes.STRING,
//             allowNull:false
//         },
//         status:{
//             type:DataTypes.STRING,
//             allowNull:false
//         }
//     },{
//       tableName: "certificate_batches",
//       timestamps: true,
//       createdAt: "issued_at",
//       updatedAt: false,
//     })

//     return Batch
// }

// module.exports = { batchModel}
