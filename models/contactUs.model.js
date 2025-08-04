const { DataTypes } = require("sequelize")



const contactUsModel = (db) => {
    return db.define('Contact_Us',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4

        },
        fullname:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        message:{
            type: DataTypes.TEXT,
            allowNull:false
        }

    })
}
module.exports = { contactUsModel }