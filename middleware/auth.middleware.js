const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");
const asyncHandler = require("express-async-handler");
const { UserOrganizationRole, Role } = require("../models");
const CustomError = require("../utils/customError");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new CustomError("Authentication token required", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { user_id: decoded.user_id };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
    throw new CustomError("Authentication token required", 401);
      
    }
    throw new CustomError("Invalid authentication token", 401);
  }
});

// api/me/:organisation_id
const protectAndCheckRoleMiddleware = (requiredRole) =>{
  return asyncHandler(async (req, res,next) => {
  const user_id = req.user.user_id;
  const org_id = req.params.organization_id;

  const userOrgRole = await UserOrganizationRole.findOne({
    where: { user_id: user_id, organization_id: org_id },
    include: { model: Role },
  });
  // if(true){
  //   throw new CustomError(`${requiredRole} hi`,400)
  // }

  if(!userOrgRole || userOrgRole.Role.role_name !== requiredRole){
    throw new CustomError(`You do not have permission to perform this action.${user_id}, ${org_id}, ${userOrgRole.Role.role_name},${requiredRole}`, 403);
  }
  

  next();
});
}


module.exports = {authMiddleware,protectAndCheckRoleMiddleware};
