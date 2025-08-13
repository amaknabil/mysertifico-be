"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.UserOrganizationRole, { foreignKey: "role_id" });

      Role.belongsTo(models.App, { foreignKey: "app_id" });

      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "role_id",
      });

      Role.hasMany(models.UserRole, { foreignKey: "role_id" });
    }
  }

  Role.init({
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role_name: {
      type: DataTypes.STRING,
    },
  },{
    sequelize,
    modelName:'Role',
    tableName:'roles'

  });

  return Role;
};

// const roleModel = (db) => {
//   const Role = db.define("Role", {
//     role_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       unique: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     role_name: {
//       type: DataTypes.STRING,
//     },
//   });

//   return Role;
// };

// module.exports = { roleModel };
