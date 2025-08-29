
("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      //list of all association
      Organization.hasMany(models.Batch, { foreignKey: "organization_id" });
      Organization.hasMany(models.UserOrganizationRole, {
        foreignKey: "organization_id",
      });

      // An organization can have many invoices
      Organization.hasMany(models.Invoice, { foreignKey: "organization_id" });

      // An organization can have many token usage records
      Organization.hasMany(models.TokenUsage, { foreignKey: "organization_id" });
    }
  }

  Organization.init(
    {
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      organization_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      total_token: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Organization",
      tableName: "organizations",
    }
  );

  return Organization;
};

// const organizationModel = (db) => {
//   const Organization = db.define("Organization", {
//     organization_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       unique: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     organization_name: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     },
//   });

//   return Organization;
// };

// module.exports = { organizationModel };
