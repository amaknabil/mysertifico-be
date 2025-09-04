"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrganizationPosition extends Model {
    static associate(models) {
      // A position belongs to one organization
      OrganizationPosition.belongsTo(models.Organization, {
        foreignKey: "organization_id",
      });
    }
  }

  OrganizationPosition.init(
    {
      organization_position_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "organizations", // This should match the table name of the Organization model
          key: "organization_id",
        },
      },
      position_name: {
        type: DataTypes.STRING,
        allowNull: false, // It's good practice to not allow null for names
      },
    },
    {
      sequelize,
      modelName: "OrganizationPosition",
      tableName: "organization_positions", // Using plural and snake_case is a common convention
      timestamps: true, // Adds createdAt and updatedAt columns
    }
  );

  return OrganizationPosition;
};