// const { DataTypes } = require("sequelize");
"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    static associate(models) {
      //one user has many certificate_recipients
      Recipient.belongsTo(models.Profile, { foreignKey: "national_id",targetKey: "national_id" });

      //one batch has many recipient
      Recipient.belongsTo(models.Batch, { foreignKey: "batch_id" });
    }
  }
  Recipient.init(
    {
      recipient_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      batch_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      national_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "certificate_recipients",
      timestamps: true,
      createdAt: "issued_at",
      updatedAt: false,
      modelName: "Recipient",
    }
  );

  return Recipient;
};
