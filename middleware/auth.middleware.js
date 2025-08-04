const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/env.config');
const asyncHandler = require("express-async-handler");

const authMiddleware= asyncHandler(async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }else if(req.cookies.jwt){
    token = req.cookies.jwt;
  }

  if(!token){
  return res.status(401).json({
    message:"Authentication token required"
  });
}

try {
  const decoded = jwt.verify(token,JWT_SECRET);

  req.user = {user_id:decoded.user_id};
  return next();
} catch (err) {
  if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication token expired' });
    }
    return res.status(401).json({ message: 'Invalid authentication token' });
  }

});

module.exports = authMiddleware;