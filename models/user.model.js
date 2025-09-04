("use strict");
const { Model } = require("sequelize");

// Change the export to this function format
module.exports = (sequelize, DataTypes) => {
  // Define the model class
  class User extends Model {
    /**
     * This static method will be called by models/index.js to create the associations.
     */
    static associate(models) {
      // --- Place all associations involving User here ---

      // For MyWall/BO (many-to-many with Role via UserRole)
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
      });

      // For direct access to the junction table
      User.hasMany(models.UserRole, { foreignKey: "user_id" });

      // For MyCertifico (one-to-many with the junction table)
      User.hasMany(models.UserOrganizationRole, { foreignKey: "user_id" });


      // For Certificate Batches (as a creator)
      User.hasMany(models.Batch, {
        foreignKey: "creator_id",
        as: "created_batches",
      });

      // Associations for Plans and Invoices
      User.hasMany(models.UserPlan, { foreignKey: "user_id" });
      User.hasMany(models.Profile, { foreignKey: "user_id" });
      User.hasMany(models.Invoice, { foreignKey: "user_id" });

      // A user can have many token usage records
      User.hasMany(models.TokenUsage, { foreignKey: "user_id" });

      User.belongsTo(models.Country, { foreignKey: 'country_name' });
    }
  }

  // Initialize the model with its fields (columns)
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
        // Your schema calls this password_hash, ensure this matches the database column name
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
        defaultValue: false,
      },
      country_name: {
        type: DataTypes.STRING,
        country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
              model: 'countries',
              key: 'country_name'
                  }
      },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // Explicitly set the table name to match your schema
    }
  );

  return User;
};

