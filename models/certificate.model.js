const { DataTypes } = require("sequelize");

const certificateModel = (db) => {
  const Certificate = db.define("Certificate", {
    certificatee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    template_data: { type: DataTypes.JSON }
  
  });

  return Certificate;
};

module.exports = { certificateModel };
