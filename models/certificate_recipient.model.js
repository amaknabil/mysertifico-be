const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipientResponse:
 *       type: object
 *       properties:
 *         recipient_id:
 *           type: string
 *           format: uuid
 *         batch_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         issued_at:
 *           type: string
 *           format: date-time
 */

const recipientModel = (db) => {
  const Recipient = db.define("Recipient", {
    recipient_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    batch_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },{
      tableName: "certificate_recipients",
      timestamps: true,
      createdAt: "issued_at",
      updatedAt: false,
    });

  return Recipient;
};

module.exports = { recipientModel };
