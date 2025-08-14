const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       description: The User object as returned by the API, excluding sensitive information.
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         full_name:
 *           type: string
 *           description: The full name of the user.
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: "jane.doe@example.com"
 *         photo_url:
 *           type: string
 *           format: uri
 *           description: URL of the user's profile picture.
 *           example: "https://example.com/path/to/photo.jpg"
 *         is_active:
 *           type: boolean
 *           description: Indicates if the user's account is active.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated.
 *
 *     CreateUserDto:
 *       type: object
 *       description: The required payload for creating a new user through the universal signup endpoint.
 *       required:
 *         - full_name
 *         - email
 *         - password
 *         - app_name
 *       properties:
 *         full_name:
 *           type: string
 *           example: "John Smith"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.smith@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User's desired password (min 8 characters).
 *           example: "password123"
 *         app_name:
 *           type: string
 *           description: The source application for the signup.
 *           enum: [mywall, bo, mycertifico]
 *           example: "mywall"
 *         role_name:
 *           type: string
 *           description: Required for 'mywall' signup.
 *           enum: [Parent, Student]
 *           example: "Parent"
 *         organization_name:
 *           type: string
 *           description: Required for the first 'mycertifico' signup to create an organization.
 *           example: "My New Company"
 *
 *     LoginDto:
 *       type: object
 *       description: The required payload for user login.
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "jane.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *
 *     UpdateUserProfileDto:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: The new full name for the user.
 *           example: "Jane Doe Smith"
 *
 *     UserOrganizationRoleResponse:
 *       type: object
 *       properties:
 *         organizationId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the organization.
 *         organizationName:
 *           type: string
 *           example: "Awesome Company Inc."
 *           description: The name of the organization.
 *         userRole:
 *           type: string
 *           example: "Admin"
 *           description: The role of the user within the organization.
 */

'use strict';
const { Model } = require('sequelize');

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
      User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });

      // For direct access to the junction table
      User.hasMany(models.UserRole, { foreignKey: 'user_id' });

      // For MyCertifico (one-to-many with the junction table)
      User.hasMany(models.UserOrganizationRole, { foreignKey: 'user_id' });

      // For Certificate Recipients
      User.hasMany(models.Recipient, { foreignKey: 'user_id', as: 'issued_certificates' });

      // For Certificate Batches (as a creator)
      User.hasMany(models.Batch, { foreignKey: 'creator_id', as: 'created_batches' });
    }
  }

  // Initialize the model with its fields (columns)
  User.init({
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
    password: { // Your schema calls this password_hash, ensure this matches the database column name
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
    // [CHANGE] Added fields for password reset tokens
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordExpiresAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users' // Explicitly set the table name to match your schema
  });

  return User;
};