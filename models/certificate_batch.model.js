const { DataTypes } = require("sequelize")


const batchModel = (db) => {
    const Batch = db.define('Batch',{
        batch_id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        template_id:{
            type:DataTypes.UUID,
            allowNull:false,
            defaultValue:DataTypes.UUIDV4
        },
        organization_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        creator_id:{
             type:DataTypes.UUID,
             allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
      tableName: "certificate_batches",
      timestamps: true,
      createdAt: "issued_at",
      updatedAt: false,
    })

    return Batch
}

module.exports = { batchModel}