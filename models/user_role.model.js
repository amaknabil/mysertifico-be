const { DataTypes } = require("sequelize");

const userRoleModel = (db) => {
  return db.define("User_Role", {
    user_roles_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // user_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // role_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    app_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    organisation_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};

module.exports = { userRoleModel };
