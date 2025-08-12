const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     OrganizationResponse:
 *       type: object
 *       properties:
 *         organization_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the organization.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         organization_name:
 *           type: string
 *           description: The name of the organization.
 *           example: "Awesome Company Inc."
 *         is_active:
 *           type: boolean
 *           description: Indicates if the organization is active.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     InviteUserDto:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - roleName
 *       properties:
 *         full_name:
 *           type: string
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "jane.doe@example.com"
 *         roleName:
 *           type: string
 *           description: The name of the role to assign to the new member.
 *           example: "Issuer"
 */

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
      unique: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return Organization;
};

module.exports = { organizationModel };
