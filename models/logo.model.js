// const { DataTypes } = require("sequelize");
'use strict';
const { Model } = require('sequelize'); 

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

