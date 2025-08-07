// models/organization.model.js
const { DataTypes } = require("sequelize");

const organizationModel = (db) => {
  const Organization = db.define(
    "Organization",
    {
      org_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      org_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      org_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // The default value should match the type of column (e.g., using a function to get the current date)
        defaultValue: DataTypes.NOW,
      },
      token_balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "organizations",
      timestamps: false,
    }
  );

  return Organization;
};

// Export it as a named export to match the import style
module.exports = { organizationModel };