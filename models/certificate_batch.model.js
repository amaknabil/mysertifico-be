// const { DataTypes } = require("sequelize")
"use strict";
const { Model } = require("sequelize");



module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    static associate(models) {
      //one batch has many recipient
      Batch.hasMany(models.Recipient, { foreignKey: "batch_id" });

      //one user can create many certificate_batches
      Batch.belongsTo(models.User, { foreignKey: "creator_id" });

      //one org can have many certificate_batches
      Batch.belongsTo(models.Organization, { foreignKey: "organization_id" });

      // Association to Template
      Batch.belongsTo(models.Template, { foreignKey: "template_id" });

      // Each batch creation results in one token usage entry.
      Batch.hasOne(models.TokenUsage, {
        foreignKey: "reference_id",
        constraints: false, // Important: reference_id is a generic field
        scope: {
          reason: "Certificate Batch Creation", // Optional: helps in querying
        },
      });
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
      modelName: "Batch",
    }
  );

  return Batch;
};


