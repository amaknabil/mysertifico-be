const { DataTypes } = require("sequelize");

const appModel = (db) => {
  const App = db.define("App", {
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
      unique:true
    },
    app_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return App;
};

module.exports = { appModel };
