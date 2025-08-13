const { DataTypes } = require("sequelize");

const roleModel = (db) => {
  const Role = db.define("Role", {
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
  });


  return Role;
};

module.exports = { roleModel };
