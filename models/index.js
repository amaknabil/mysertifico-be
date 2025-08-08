const { db } = require("../config/db.config");
const { contactUsModel } = require("./contactUs.model");
const { userModel } = require("./user.model");
const { userRoleModel } = require("./user_role.model");
const {roleModel} = require('./role.model');
const {logoModel} = require('./logo.model');
const { appModel } = require("./app.model");
const { organizationModel } = require("./organization.model");
const { certificateModel } = require("./certificate.model");
const { userOrganizationRoleModel } = require("./user_organization_role.model");
const { templateModel } = require("./templates.model");

const App = appModel(db);
const Certificate = certificateModel(db);
const ContactUs = contactUsModel(db);
const Logo  = logoModel(db);
const Organization = organizationModel(db);
const Role  = roleModel(db);
const UserRole = userRoleModel(db);
const UserOrganizationRole = userOrganizationRoleModel(db);
const User = userModel(db);
const Template = templateModel(db);



// --- Define All Associations ---

// App <--> Role
App.hasMany(Role, { foreignKey: 'app_id' });
Role.belongsTo(App, { foreignKey: 'app_id' });

// User <--> Role (for MyWall/BO, using the UserRole junction model)
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

User.hasMany(UserRole, { foreignKey: 'user_id' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });

Role.hasMany(UserRole, { foreignKey: 'role_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });


// User <--> Organization <--> Role (for MyCertifico, using its own model)
User.hasMany(UserOrganizationRole, { foreignKey: 'user_id' });
UserOrganizationRole.belongsTo(User, { foreignKey: 'user_id' });

Organization.hasMany(UserOrganizationRole, { foreignKey: 'organization_id' });
UserOrganizationRole.belongsTo(Organization, { foreignKey: 'organization_id' });

Role.hasMany(UserOrganizationRole, { foreignKey: 'role_id' });
UserOrganizationRole.belongsTo(Role, { foreignKey: 'role_id' });








module.exports = {User,ContactUs, Role,Logo,App,UserRole,Organization, UserOrganizationRole,Certificate, Template}

