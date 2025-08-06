const { DataTypes } = require("sequelize");

const userOrganizationRoleModel = (db) => {
  return db.define(
    "User_Organization_Role",
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
    },
    {
      tableName: "user_organization_roles",
      timestamps: true,
      createdAt: "assigned_at",
      updatedAt: false,
    }
  );
};

module.exports = { userOrganizationRoleModel };
