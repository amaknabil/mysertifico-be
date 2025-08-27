'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Template extends Model{
    static associate(models){
        // A template can be used in many certificate batches
        Template.hasMany(models.Batch, { foreignKey: 'template_id' });
    }
  }

  Template.init(
    {
      template_id: {
        type: DataTypes.UUID, // Changed from STRING to UUID
        defaultValue: DataTypes.UUIDV4, // Added a default value
        allowNull: false,
        primaryKey: true,
      },
      template_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      style: {
        type: DataTypes.STRING,
      },
      orientation: {
        type: DataTypes.STRING,
      },
      theme_color: {
        type: DataTypes.STRING,
      },
      global_alignment: {
        type: DataTypes.STRING,
      },
      blanko_url: {
        type: DataTypes.STRING,
        validate: { isUrl: { msg: "Please Provide a valid Url" } },
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
      deleted_by: {
        type: DataTypes.STRING,
      },
      metadata: {
        type: DataTypes.TEXT,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName:'templates',
      modelName:'Template',
      timestamps: true,
      paranoid: true, // This enables soft deletes
      createdAt: 'created_date',
      updatedAt: 'updated_date',
      deletedAt: 'deleted_date',
    }
  );

  return Template;
};
