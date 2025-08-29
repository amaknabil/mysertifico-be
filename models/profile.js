"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // For Certificate Recipients
      Profile.hasMany(models.Recipient, {foreignKey: "national_id",sourceKey: "national_id"});
      Profile.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  Profile.init(
    {
      profile_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      },
      national_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: DataTypes.STRING
  
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING,
      },
      postcode: {
        type: DataTypes.STRING,
      },
      about_me: {
        type: DataTypes.STRING,
      },
      skills: {
        type: DataTypes.STRING,
      },
      linkedin_url: {
        type: DataTypes.STRING,
      },
      github_url: {
        type: DataTypes.STRING,
  
      },
      portfolio_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
      timestamps: true, // Automatically add createdAt and updatedAt columns
    }
  );

  return Profile;
};
