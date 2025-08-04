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

//   Role.associate = (models) => {
//     Role.belongsToMany(models.User, {
//       through: models.User_Role,
//       foreignKey: "role_id",
//     });
//   };

  return Role;
};

module.exports = { roleModel };
