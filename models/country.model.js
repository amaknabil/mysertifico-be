"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      // A country can be associated with many plans and users
      // The foreign key in the Plan and User models will be `country_name`
      Country.hasMany(models.Plan, { foreignKey: "country_name" });
      Country.hasMany(models.User, { foreignKey: "country_name" });
      Country.hasMany(models.Organization, { foreignKey: "country_name" });
    }
  }

  Country.init(
    {
      country_name: {
        type: DataTypes.STRING,
        primaryKey: true, // Set country_name as the primary key
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      timestamps: false, // Country data is static, no need for timestamps
    }
  );

  return Country;
};

