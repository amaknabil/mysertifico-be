// const { DataTypes } = require("sequelize");
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model{
    static associate(models){
      UserRole.belongsTo(models.User, { foreignKey: 'user_id' });
      
      UserRole.belongsTo(models.Role, { foreignKey: 'role_id' });

    }
  }
  UserRole.init(
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
      is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
      }
    },
    {
      sequelize,
      modelName:'UserRole',
      tableName: "user_roles",
      timestamps: true,
      createdAt: "assigned_at",
      updatedAt: false,
    }
  );

  return UserRole
};


