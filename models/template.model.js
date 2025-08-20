'use strict';
const { Model } = require('sequelize');

/**
 * @openapi
 * components:
 * schemas:
 * Template:
 * type: object
 * properties:
 * template_id:
 * type: string
 * format: uuid
 * description: Unique identifier for the template.
 * template_code:
 * type: string
 * description: A unique code for the template.
 * title:
 * type: string
 * description: Template title.
 * style:
 * type: string
 * description: Template style (e.g., 'modern', 'classic').
 * orientation:
 * type: string
 * description: Template orientation (e.g., 'portrait', 'landscape').
 * theme_color:
 * type: string
 * description: Template color theme (e.g., '#FFFFFF').
 * global_alignment:
 * type: string
 * description: The global text alignment of the template (e.g., 'center', 'left').
 * blanko_url:
 * type: string
 * format: url
 * description: The URL to the blank template image.
 * metadata:
 * type: object
 * description: Additional metadata for the template.
 * created_by:
 * type: string
 * description: The user who created the template.
 * updated_by:
 * type: string
 * description: The user who last updated the template.
 * deleted_by:
 * type: string
 * description: The user who soft-deleted the template.
 * is_active:
 * type: boolean
 * description: Indicates if the template is active.
 * created_date:
 * type: string
 * format: date-time
 * description: The date and time the template was created.
 * updated_date:
 * type: string
 * format: date-time
 * description: The date and time the template was last updated.
 * deleted_date:
 * type: string
 * format: date-time
 * description: The date and time the template was soft-deleted.
 * required:
 * - template_id
 * - title
 * - style
 * - orientation
 * - theme_color
 * - global_alignment
 * - blanko_url
 * - template_code
 * - created_by
 * - is_active
 */

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
