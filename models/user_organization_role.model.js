"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserOrganizationRole extends Model {
    static associate(models) {

      // User <--> Organization <--> Role (for MyCertifico, using its own model
      UserOrganizationRole.belongsTo(models.User, { foreignKey: "user_id" });

      UserOrganizationRole.belongsTo(models.Organization, {foreignKey: "organization_id",});

      UserOrganizationRole.belongsTo(models.Role, { foreignKey: "role_id" });
    }
  }
  UserOrganizationRole.init(
    {
      // This is for MyCertifico roles (with extra attributes)
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // references: { model: User, key: "user_id" },
      },
      organization_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // references: { model: Organization, key: "organization_id" },
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: { model: Role, key: "role_id" },
      },
      details: { type: DataTypes.JSON },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "UserOrganizationRole",
      tableName: "user_organization_roles",
      timestamps: true,
      createdAt: "assigned_at",
      updatedAt: false,
    }
  );

  return UserOrganizationRole
};

