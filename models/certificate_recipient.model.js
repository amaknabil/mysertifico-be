const { DataTypes } = require("sequelize");

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
