const { db } = require("../config/db.config");
const { contactUsModel } = require("./contactUs.model");
const { userModel } = require("./user.model");
const { userRoleModel } = require("./user_role.model");
const {roleModel} = require('./role.model');
const {logoModel} = require('./logo.model');

const User = userModel(db);
const ContactUs = contactUsModel(db);
const Role  = roleModel(db);
const Logo  = logoModel(db);
const User_Role = userRoleModel(db);

User.belongsToMany(Role,{through:User_Role,foreignKey: 'user_id'})
Role.belongsToMany(User,{through:User_Role,foreignKey: 'role_id'})


module.exports = {User,ContactUs, Role,Logo}

