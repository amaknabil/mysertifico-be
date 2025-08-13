// const { DataTypes } = require("sequelize");
'use strict';
const { Model } = require('sequelize'); 
/**
 * @openapi
 * components:
 *   schemas:
 *     Logo:
 *       type: object
 *       properties:
 *         logo_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the logo.
 *         file_name:
 *           type: string
 *           description: The name of the logo file.
 *         file_url:
 *           type: string
 *           format: url
 *           description: The URL where the logo file is stored.
 *         file_type:
 *           type: string
 *           description: The file type of the logo (e.g., 'image/png').
 *         is_primary:
 *           type: boolean
 *           description: Indicates if the logo is the primary logo for an organization.
 *       required:
 *         - logo_id
 *         - file_name
 *         - file_url
 *         - is_primary
 */

module.exports = (sequelize, DataTypes) => {
    class Logo extends Model{
        // static associate(models){

        // }
    }


    Logo.init( {
        logo_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        file_type: {
            type: DataTypes.STRING,
        },
        file_size: {
            type: DataTypes.INTEGER,
        },
        is_primary: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },{
        sequelize,
        tableName:'logos',
        modelName:'Logo'
    });

    return Logo
};



// const logoModel = (db) => {
//     return db.define('Logo', {
//         logo_id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             allowNull: false,
//             unique: true
//         },
//         file_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         file_url: {
//             type: DataTypes.TEXT,
//             allowNull: false
//         },
//         file_type: {
//             type: DataTypes.STRING,
//         },
//         file_size: {
//             type: DataTypes.INTEGER,
//         },
//         is_primary: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false
//         },
//     });
// };

// module.exports = { logoModel };

