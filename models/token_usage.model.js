"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TokenUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A token usage entry belongs to one Organization
      TokenUsage.belongsTo(models.Organization, {
        foreignKey: "organization_id",
      });

      // A token usage entry is initiated by one User
      TokenUsage.belongsTo(models.User, { foreignKey: "user_id" });

      // A token usage entry can belong to a Batch
      TokenUsage.belongsTo(models.Batch, {
        foreignKey: "reference_id",
        constraints: false,
      });
    }
  }

  TokenUsage.init(
    {
      usage_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "organizations", // table name
          key: "organization_id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", // table name
          key: "user_id",
        },
      },
      tokens_used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // Must use at least one token
        },
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true, // A brief description of why the token was used
        comment: "e.g., Certificate Batch Creation, API Call, etc.",
      },
      reference_id: {
        type: DataTypes.UUID,
        allowNull: true, // Optional: Can link to a specific batch_id, etc.
      },
    },
    {
      sequelize,
      modelName: "TokenUsage",
      tableName: "token_usage",
      timestamps: true,
      updatedAt: false, // We only care about when it was created
      createdAt: "usage_date", // Rename createdAt to usage_date for clarity
    }
  );

  return TokenUsage;
};
