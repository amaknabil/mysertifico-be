const { DataTypes } = require("sequelize");

const organizationModel = (db) => {
  const Organization = db.define("Organization", {
    organization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    organization_name: {
      type: DataTypes.STRING,
      unique: true
    },
  });


  return Organization;
};

module.exports = { organizationModel };
