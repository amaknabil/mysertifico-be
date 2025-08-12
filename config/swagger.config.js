const {name,version} = require('../package.json');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerConfig = {
    definition:{
        openapi: "3.0.4",
        info:{
            title:name,
            version,
            description:'API documentation for the MySertifico, MyWall, and BO applications.'
        },
        servers: [{ url: 'http://localhost:3000' }]// Change to your server URL
    },
    apis:["./routes/*.js","./models/*.js"]
}


const swaggerSpecification = swaggerJsdoc(swaggerConfig)
module.exports = {swaggerSpecification}