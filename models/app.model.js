"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class App extends Model {
    static associate(models) {
      App.hasMany(models.Role, { foreignKey: "app_id" });
      // An app can have many plans
      App.hasMany(models.Plan, { foreignKey: "app_id" });

      // An app can be associated with many invoices
      App.hasMany(models.Invoice, { foreignKey: "app_id" });
    }
  }

  App.init(
    {
      app_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      app_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      app_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "App",
      tableName: "apps",
    }
  );

  return App;
};

// const appModel = (db) => {
//   const App = db.define("App", {
//     app_id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       unique: true,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//     },
//     app_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique:true
//     },
//     app_code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   return App;
// };

// module.exports = { appModel };
