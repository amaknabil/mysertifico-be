const { DataTypes } = require("sequelize")



const logoModel = (db) =>{
    return db.define('Logo',{
        logo_id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            unique:true
        },
        file_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        file_url:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        file_type:{
            type:DataTypes.STRING,
        },
        file_size:{
            type:DataTypes.INTEGER,
        },
        is_primary:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
    })
}

module.exports = {logoModel}