"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPlan extends Model {
    static associate(models) {
      // Establishes the relationship between UserPlan, User, and Plan
      UserPlan.belongsTo(models.User, { foreignKey: "user_id" });
      UserPlan.belongsTo(models.Plan, { foreignKey: "plan_id" });
    }
  }

  UserPlan.init(
    {
      user_plan_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'cancelled'), // Changed to ENUM
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: "UserPlan",
      tableName: "user_plans",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  return UserPlan;
};