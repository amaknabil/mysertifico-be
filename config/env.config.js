const dotenv = require('dotenv');
const path = require('path');


dotenv.config({path: path.resolve(__dirname,'../.env')});

// [CHANGE] Added BASE_URL to module.exports
module.exports = { ...process.env }