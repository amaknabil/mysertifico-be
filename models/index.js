"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const logger = require("../config/logger"); // Keep the logger
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// Use our custom logger for Sequelize's output
config.logging = (msg) => logger.debug(msg);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const { db } = require("../config/db.config");
// const { contactUsModel } = require("./contactUs.model");
// const { userModel } = require("./user.model");
// const { userRoleModel } = require("./user_role.model");
// const {roleModel} = require('./role.model');
// const {logoModel} = require('./logo.model');
// const { appModel } = require("./app.model");
// const { organizationModel } = require("./organization.model");
// const { recipientModel } = require("./certificate_recipient.model");
// const {batchModel} = require('./certificate_batch.model');
// const { userOrganizationRoleModel } = require("./user_organization_role.model");
// const { templateModel } = require("./template.model");

// const App = appModel(db);
// const Batch = batchModel(db);
// const Recipient = recipientModel(db);
// const ContactUs = contactUsModel(db);
// const Logo  = logoModel(db);
// const Organization = organizationModel(db);
// const Role  = roleModel(db);
// const UserRole = userRoleModel(db);
// const UserOrganizationRole = userOrganizationRoleModel(db);
// const User = userModel(db);
// const Template = templateModel(db);

// // --- Define All Associations ---

// // App <--> Role
// App.hasMany(Role, { foreignKey: 'app_id' });
// Role.belongsTo(App, { foreignKey: 'app_id' });

// // User <--> Role (for MyWall/BO, using the UserRole junction model)
// User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
// Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

// User.hasMany(UserRole, { foreignKey: 'user_id' });
// UserRole.belongsTo(User, { foreignKey: 'user_id' });

// Role.hasMany(UserRole, { foreignKey: 'role_id' });
// UserRole.belongsTo(Role, { foreignKey: 'role_id' });

// // User <--> Organization <--> Role (for MyCertifico, using its own model)
// User.hasMany(UserOrganizationRole, { foreignKey: 'user_id' });
// UserOrganizationRole.belongsTo(User, { foreignKey: 'user_id' });

// Organization.hasMany(UserOrganizationRole, { foreignKey: 'organization_id' });
// UserOrganizationRole.belongsTo(Organization, { foreignKey: 'organization_id' });

// Role.hasMany(UserOrganizationRole, { foreignKey: 'role_id' });
// UserOrganizationRole.belongsTo(Role, { foreignKey: 'role_id' });

// //User <--> Recipient <-->  Batch <--> Organization

// //one user has many certificate_recipients
// User.hasMany(Recipient,{foreignKey:'user_id'});
// Recipient.belongsTo(User,{foreignKey:'user_id'});

// //one batch has many recipient
// Batch.hasMany(Recipient,{foreignKey:'batch_id'});
// Recipient.belongsTo(Batch,{foreignKey:'batch_id'});

// //one user can create many certificate_batches
// User.hasMany(Batch,{foreignKey:'creator_id'});
// Batch.belongsTo(User,{foreignKey:'creator_id'});

// //one org can have many certificate_batches
// Organization.hasMany(Batch,{foreignKey:'organization_id'});
// Batch.belongsTo(Organization,{foreignKey:'organization_id'});

// module.exports = {User,ContactUs, Role,Logo,App,UserRole,Organization, UserOrganizationRole,Batch , Recipient,Template}
