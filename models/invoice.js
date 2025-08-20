"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      // Establishes that an Invoice belongs to a User, Organization, App, and Plan
      Invoice.belongsTo(models.User, { foreignKey: "user_id" });
      Invoice.belongsTo(models.Organization, { foreignKey: "organization_id" });
      Invoice.belongsTo(models.App, { foreignKey: "app_id" });
      Invoice.belongsTo(models.Plan, { foreignKey: "plan_id" });
    }
  }

  Invoice.init(
    {
      invoice_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      app_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.UUID,
        allowNull: true, // A token purchase might not be linked to a specific plan
      },
      invoice_type: {
        type: DataTypes.ENUM('subscription', 'token'),
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_token_buy: {
        type: DataTypes.INTEGER, // Changed from DATE to INTEGER
        allowNull: true, // Only applicable when invoice_type is 'token'
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Changed to DECIMAL for accuracy
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoice",
      tableName: "invoices",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  return Invoice;
};