"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Plan belongs to one App
      Plan.belongsTo(models.App, { foreignKey: "app_id" });

      // A Plan can be associated with many UserPlans
      Plan.hasMany(models.UserPlan, { foreignKey: "plan_id" });

      // A Plan can be associated with many Invoices
      Plan.hasMany(models.Invoice, { foreignKey: "plan_id" });

      Plan.belongsTo(models.Country, { foreignKey: 'country_name' });
    }
  }

  Plan.init(
    {
      plan_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      app_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      plan_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Use DECIMAL for financial values
        allowNull: false,
      },
      price_pertoken: {
        type: DataTypes.DECIMAL(10, 2), // Use DECIMAL for financial values
        allowNull: false,
      },
      subscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      token_allocation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
              model: 'countries',
              key: 'country_name'
                  }
      },
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "plans",
      timestamps: true, // Automatically add createdAt and updatedAt columns
    }
  );

  return Plan;
};
