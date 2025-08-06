const { DataTypes } = require("sequelize");

const userRoleModel = (db) => {
  return db.define(
    "User_Role",
    {
      // This is for MyWall & BO roles (no extra attributes)
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // references: { model: User, key: "user_id" },
      },
      role_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // references: { model: Role, key: "role_id" },
      },
    },
    {
      tableName: "user_roles",
      timestamps: true,
      createdAt: "assigned_at",
      updatedAt: false,
    }
  );
};

module.exports = { userRoleModel };
