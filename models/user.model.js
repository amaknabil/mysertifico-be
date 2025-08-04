const { DataTypes } = require("sequelize");

const userModel = (db) => {
  const User = db.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: "Please Provide a valid Email" } },
        set(value) {
          this.setDataValue("email", value.toLowerCase().trim());
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo_url: {
        type: DataTypes.STRING,
        validate: { isUrl: { msg: "Please Provide a valid Url" } },
      },
      verify_token: {
        type: DataTypes.STRING,
      },
      verify_token_expires_at: {
        type: DataTypes.DATE,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
         defaultValue: false
      },
    },
  );

  // User.associate = (models) =>{
  //   User.belongsToMany(models.Role,{
  //     through:models.User_Role,
  //     foreignKey:'user_id'
  //   })
  // }

  return User;
};

module.exports = { userModel };
